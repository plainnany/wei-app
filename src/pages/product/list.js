import Taro, { Component, connectSocket } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View, Text } from "@tarojs/components";
import "./list.less";
import Loading from "../../components/loading";
import { BASE_URL } from "../../config/index";

@connect(({ product, loading, user }) => ({
  ...product,
  ...loading,
  ...user
}))
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "",
      menu_child: []
    };
  }

  componentWillMount() { }

  componentDidMount() {
    const menu_id = this.$router.params.id;
    this.getProduct(menu_id);
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    Taro.setNavigationBarTitle({ title: this.$router.params.title })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleTab = type => {
    this.setState({ activeTab: type });
    this.getProduct(type);
  };

  getProduct = menu_id => {
    this.props.dispatch({
      type: "product/getProduct",
      payload: { menu_id }
    });
  };

  goPageDetail = item => {
    const url = `/pages/productDetail/index?id=${item.menu_id}&title=${item.product_name}`
    if (!this.props.open_id) {
      Taro.showToast({
        title: '暂无登录，请先授权登录',
        icon: 'none'
      })
      Taro.navigateTo({ url: `/pages/auth/index?redirectPath=/pages/productDetail/index&id=${item.menu_id}&title=${item.product_name}` })
      return
    }
    Taro.navigateTo({ url })
  };

  render() {
    const { effects, product_list } = this.props;
    const loading = effects["product/getProduct"];
    return (
      <View className="wrap">
        {loading ? (
          <Loading />
        ) : product_list.length === 0 ? (
          <View className="no_data">暂无数据</View>
        ) : (
              <View className="list">
                <View className="list_product">
                  {product_list.map(v => (
                    <View
                      className="list_product_item"
                      key={v.menu_id}
                      onClick={this.goPageDetail.bind(null, v)}
                    >
                      <Image mode="widthFix" src={`${BASE_URL}${v.image_url}`} alt={v.image_name} />
                      <View className="text">{v.product_name}</View>
                    </View>
                  ))}
                </View>
              </View>
            )}
      </View>
    );
  }
}

export default Index;
