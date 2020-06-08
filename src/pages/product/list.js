import Taro, { Component, connectSocket } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View, Text } from "@tarojs/components";
import "./list.less";
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
      menu_child: []
    };
  }

  componentWillMount() { }

  componentDidMount() {
    const menu_id = this.$router.params.id;
    this.getProduct(menu_id);
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: "系列"
  };

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

  goPageDetail = v => {
    Taro.navigateTo({
      url: `/pages/productDetail/index?id=${v.menu_id}`
    });
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
                      <Image src={`${BASE_URL}${v.image_url}`} alt={v.image_name} />
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
