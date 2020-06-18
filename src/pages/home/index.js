import Taro, { Component } from "@tarojs/taro";
import { View, Image, Navigator } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import MySwiper from "../../components/MySwiper";
import GoodsList from "../../components/GoodsList";
import "./index.less";
import Footer from "../../components/footer";
import mockData from "../../mock/index";
import "../../styles/iconfont2.less";

@connect(({ home, loading }) => ({
  ...home,
  ...loading
}))
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: mockData.banners,
      products: mockData.products
    };
  }

  componentWillMount() { }

  componentDidMount() {
    this.props.dispatch({
      type: 'home/load'
    })
    this.props.dispatch({
      type: "home/product"
    });
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: "首页"
  };

  goToPage = e => {
    Taro.navigateTo({
      url: e.currentTarget.dataset.url
    });
  };

  render() {
    const { products, banner, effects } = this.props;

    return (
      <View className="home">
        <MySwiper banner={banner} />
        <View className="tabs">
          <View
            className={`tabs-item tabs-item-info`}
            data-url="/pages/productDetail/index"
            onClick={this.goToPage}
          >
            <Text className="iconfont">&#xe709;</Text>
            <View>公司简介</View>
          </View>
          <View
            className="tabs-item"
          >
            <Navigator
              url="/pages/productItem/index?id=2"
              openType="navigate"
              hoverClass="none"
            >
              <Text className="iconfont">&#xe602;</Text>
              <View>粉末涂料</View>
            </Navigator>
          </View>
          <View
            className="tabs-item"
          >
            <Navigator
              url="/pages/productItem/index?id=14"
              openType="navigate"
              hoverClass="none"
            >
              <Text className="iconfont">&#xe606;</Text>
              <View>水性涂料</View>
            </Navigator>
          </View>
          <View
            className="tabs-item"
            onClick={() => Taro.navigateTo({ url: '/pages/view/index?i=xxx' })}
          >
            <Text className="iconfont">&#xe75d;</Text>
            <View>解决方案</View>
          </View>
        </View>
        <GoodsList
          list={products}
          loading={effects["home/product"]}
        />
        <Footer />
      </View>
    );
  }
}

export default Index;
