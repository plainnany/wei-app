import Taro, { Component } from "@tarojs/taro";
import { View, Text, Video, Image } from "@tarojs/components";
import "./index.less";
import mockData from "../../mock/index";
import Loading from "../../components/loading";
import service from '../home/service'
import { BASE_URL, PARAMS } from '../../config'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "link",
      products: []
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
    navigationBarTitleText: "品牌"
  };

  handleTab = type => {
    this.setState({ activeTab: type });
    this.getProduct(type);
  };

  getProduct = type => {
    this.setState({ loading: true })
    service.getMenu({
      menu_id: PARAMS[type || 'link']
    }).then(res => {
      this.setState({
        products: res.data,
        loading: false
      })
    })
  };

  goToPage = v => {
    if (this.state.activeTab === 'link') {
      Taro.navigateTo({ url: `/pages/view/index?link=${v.describe_msg}` });
    }
  };

  render() {
    const { loading, products, activeTab } = this.state;
    const tabs = [
      {
        type: "link",
        title: "产品画册"
      },
      {
        type: "video",
        title: "视频"
      },
      {
        type: "project",
        title: "工程案例"
      }
    ];
    return (
      <View className="wrap">
        <View className="tab">
          {tabs.map(v => (
            <Text
              className={`tab_item ${activeTab === v.type ? 'tab_item_active' : ''}`}
              key={v.type}
              onClick={this.handleTab.bind(null, v.type)}
            >
              {v.title}
            </Text>
          ))}
        </View>
        {loading ? (
          <Loading />
        ) : (
            <View className="content">
              {activeTab === 'video' ? (
                <View className="video">
                  {products.map(v => (
                    <View
                      className="video_item"
                      key={v.image_id}
                    >
                      <Video src={`${BASE_URL}${v.image_url}`} />
                      <View className="text">{v.product_name}</View>
                    </View>
                  ))}
                </View>
              ) : (
                  <View className="product">
                    {products.map(v => (
                      <View
                        className="product_item"
                        key={v.image_id}
                        onClick={this.goToPage.bind(null, v)}
                      >
                        <Image src={`${BASE_URL}${v.image_url}`} alt={v.image_name} />
                        <View className="text">{v.product_name}</View>
                      </View>
                    ))}
                  </View>
                )}
            </View>
          )}
      </View>
    );
  }
}
