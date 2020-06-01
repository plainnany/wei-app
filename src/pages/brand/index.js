import Taro, { Component } from "@tarojs/taro";
import { View, Text, WebView } from "@tarojs/components";
import "./index.less";
import mockData from "../../mock/index";
import Loading from "../../components/loading";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "products",
      products: []
    };
  }

  componentWillMount() {}

  componentDidMount() {
    this.getProduct();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config = {
    navigationBarTitleText: "品牌"
  };

  handleTab = type => {
    this.setState({ activeTab: type });
    this.getProduct(type);
  };

  getProduct = type => {
    this.setState({ loading: true });
    const products = [];
    for (let i = 0; i < 10; i++) {
      products.push({
        id: i,
        title: `product ${i + 1}`,
        url: "",
        type: `type${i}`
      });
    }
    setTimeout(() => {
      this.setState({ products, loading: false });
    }, 1000);
  };

  goToPage = type => {
    Taro.navigateTo({ url: `/pages/view/index?type=${type}` });
  };

  render() {
    const { loading, products } = this.state;
    const tabs = [
      {
        type: "products",
        title: "产品画册"
      },
      {
        type: "video",
        title: "视频"
      },
      {
        type: "ser",
        title: "工程系列"
      }
    ];
    return (
      <View className="wrap">
        <View className="tab">
          {tabs.map(v => (
            <Text
              className={`tab-item ${
                this.state.activeTab === v.type ? "tab-item-active" : ""
              }`}
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
            {this.state.products.map(v => (
              <View className="list" key={v.id}>
                <View
                  className="list-item"
                  onClick={() => this.goToPage(v.type)}
                >
                  图片链接
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  }
}
