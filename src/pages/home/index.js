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
    navigationBarTitleText: "千江官方小程序"
  };

  goToPage = icon => {
    if (icon.product_name === '公司简介') {
      Taro.navigateTo({ url: `/pages/desc/index?id=${PARAMS.info}` });
    } else if (icon.product_name === '粉末涂料') {
      Taro.navigateTo({ url: `/pages/productItem/index?id=2` });
    } else if (icon.product_name === '水性涂料') {
      Taro.navigateTo({ url: `/pages/productItem/index?id=14` });
    } else if (icon.product_name === '工程案例') {
      this.props.dispatch({
        type: 'home/save',
        payload: { swtich_brand_tab: 'project' }
      })
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
