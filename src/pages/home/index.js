import Taro, { Component } from "@tarojs/taro";
import { View, Image, Navigator } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import MySwiper from "../../components/MySwiper";
import GoodsList from "../../components/GoodsList";
import "./index.less";
import Footer from "../../components/footer";
import { PARAMS, BASE_URL } from '../../config'

@connect(({ home, loading }) => ({
  ...home,
  ...loading
}))
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() { }

  componentDidMount() {
    this.props.dispatch({
      type: 'home/load'
    })
    this.props.dispatch({
      type: "home/product"
    })

    this.props.dispatch({
      type: "home/icons"
    });
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: "首页"
  };

  goToPage = icon => {
    if (icon.product_name === '公司简介') {
      Taro.navigateTo({ url: `/pages/desc/index?id=${PARAMS.info}` });
    } else if (icon.product_name === '粉末涂料') {
      Taro.navigateTo({ url: `/pages/productItem/index?id=2` });
    } else if (icon.product_name === '水性涂料') {
      Taro.navigateTo({ url: `/pages/productItem/index?id=14` });
    } else if (icon.product_name === '解决方案') {
      Taro.switchTab({ url: '/pages/brand/index' })
    }
  };

  render() {
    const { products, banner, effects, icons } = this.props;
    return (
      <View className="home">
        <MySwiper banner={banner} />
        <View className="tabs">
          {icons.map(icon => (
            <View
              key={icon.image_id}
              className={`tabs-item tabs-item-info`}
              onClick={this.goToPage.bind(null, icon)}
            >
              <View className="iconfont">
                <Image src={`${BASE_URL}${icon.image_url}`} mode="widthFix" />
              </View>
              <View>
                {icon.product_name}
              </View>
            </View>
          ))}
          {/* <View
            className={`tabs-item tabs-item-info`}
            data-url={`/pages/desc/index?id=${PARAMS.info}`}
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
            onClick={() => Taro.switchTab({ url: '/pages/brand/index' })}
          >
            <Text className="iconfont">&#xe75d;</Text>
            <View>解决方案</View>
          </View> */}
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
