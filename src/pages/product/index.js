import Taro, { Component, connectSocket } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View } from "@tarojs/components";
import { AtFloatLayout } from "taro-ui";
import "./index.less";
import Loading from "../../components/loading";
import { BASE_URL } from "../../config/index";

@connect(({ product, loading }) => ({
  ...product,
  ...loading
}))
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "",
      third_menu_list: [],
      menu_child: [],
      currentParentId: ''
    };
  }

  componentWillMount() { }

  componentDidMount() {
    this.getProduct();
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: "全部商品"
  };

  handleTab = type => {
    this.setState({ activeTab: type });
    this.getProduct(type);
  };

  getProduct = () => {
    this.props
      .dispatch({
        type: "product/load",
        payload: {}
      })
      .then(data => {
        const parent = data[0] || {};
        const { activeTab, third_menu_list } = this.getChildMenu(parent);
        this.setState({
          activeTab,
          third_menu_list,
          currentParentId: parent.menu_id
        });
      });
  };

  onClick = (menu, parentId) => {
    this.setState({ activeTab: menu.menu_id, currentParentId: parentId });
    const third_menu_list = menu.child || [];
    this.setState({ third_menu_list });
  };

  clickParent = (parent, parentId) => {
    const { activeTab, third_menu_list } = this.getChildMenu(parent);
    this.setState({ activeTab, third_menu_list, currentParentId: parentId });
  };

  getChildMenu = parent => {
    const children = parent.child || [];
    const firstChild = children[0] || {};
    const activeTab = firstChild.menu_id;
    const third_menu_list = firstChild.child || [];
    return {
      activeTab,
      third_menu_list
    };
  };

  goPageDetail = v => {
    Taro.navigateTo({
      url: `/pages/product/list?id=${v.menu_id}`
    });
  };

  render() {
    const { menu_list, effects } = this.props;
    const { activeTab, third_menu_list, currentParentId } = this.state;
    if (effects["product/product"]) {
      return <Loading />;
    }
    return (
      <View className="wrap">
        <View className="sider">
          <View className="menu-wrap">
            {menu_list.map(menu => (
              <View className="sider-item" key={menu.menu_id}>
                <View
                  onClick={this.clickParent.bind(null, menu, menu.menu_id)}
                  className="sider-item-depth-1"
                >
                  {menu.menu_name}
                </View>
                <View className={currentParentId !== menu.menu_id ? 'hidden' : ''}>
                  {menu.child.map(child => (
                    <View
                      key={child.menu_id}
                      onClick={this.onClick.bind(null, child, menu.menu_id)}
                      className={`sider-item-depth-2 ${activeTab === child.menu_id ? "sider-item-active" : ""}`}
                    >
                      {child.menu_name}
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
          <View className="footer">
            <View
              className="score"
              onClick={() => Taro.navigateTo({ url: '/pages/score/index' })}
            >
              我的福利
          </View>
            <View onClick={() => Taro.makePhoneCall({ phoneNumber: '18664212905' })}>
              在线客服
            </View>
          </View>
        </View>
        <View className="content">
          <View className="product">
            {third_menu_list.map(v => (
              <View
                className="product-item"
                key={v.menu_id}
                onClick={this.goPageDetail.bind(null, v)}
              >
                <Image mode="widthFix" src={`${BASE_URL}${v.menu_url}`} alt={v.image_name} />
                <View className="text">{v.menu_name}</View>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

export default Index;
