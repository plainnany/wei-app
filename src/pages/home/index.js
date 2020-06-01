import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
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

  componentWillMount() {}

  componentDidMount() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
    // this.props.dispatch({
    //   type: 'home/load'
    // })
    this.props.dispatch({
      type: "home/getProduct"
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "首页"
  };

  xxx = () => {
    console.log("click");
    Taro.checkSession({
      success: function() {
        //session_key 未过期，并且在本生命周期一直有效
        console.log("success");
      },
      fail: function() {
        console.log("fail");
        Taro.login({
          success: data => {
            console.log("login success", data);
          },
          fail: data => {
            console.log("login fail", data);
          }
        });
        // session_key 已经失效，需要重新执行登录流程
      }
    });
  };

  goToPage = e => {
    Taro.navigateTo({
      url: e.currentTarget.dataset.url
    });
  };

  render() {
    const products = this.state.products;
    const { products_list, banners, effects } = this.props;
    const tabs = [
      {
        type: "products",
        title: "公司简介",
        icon: "&#xe709;",
        className: "home"
      },
      {
        type: "video",
        title: "粉末涂料",
        icon: "&#xe602;",
        className: "image"
      },
      {
        type: "ser",
        title: "水性涂料",
        icon: "&#xe606;",
        className: "ticket"
      },
      {
        type: "news",
        title: "乳胶漆",
        icon: "&#xe606;"
      }
    ];
    return (
      <View className="home">
        <MySwiper banner={this.state.banner} />
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
            className={`tabs-item tabs-item-info`}
            data-url="/pages/product/list"
            onClick={this.goToPage}
          >
            <Text className="iconfont">&#xe602;</Text>
            <View>粉末涂料</View>
          </View>
          <View
            className="tabs-item"
            data-url="/pages/product/index"
            onClick={this.goToPage}
          >
            <Text className="iconfont">&#xe606;</Text>
            <View>水性涂料</View>
          </View>
          <View
            className="tabs-item"
            data-url="/pages/product/index"
            onClick={this.goToPage}
          >
            <Text className="iconfont">&#xe75d;</Text>
            <View>乳胶漆</View>
          </View>
        </View>
        <GoodsList
          list={mockData.products}
          // loading={effects["home/product"]}
          loading={this.state.loading}
        />
        <Footer />
      </View>
    );
  }
}

export default Index;
