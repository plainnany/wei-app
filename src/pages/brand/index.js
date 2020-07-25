import Taro, { Component } from "@tarojs/taro";
import { View, Text, Video, Image } from "@tarojs/components";
import "./index.less";
import Loading from "../../components/loading";
import service from '../home/service'
import { BASE_URL, PARAMS } from '../../config'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "link",
      products: [],
      project: []
    };
  }

  componentWillMount() { }

  componentDidMount() {
    this.getLink();
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: "品牌"
  };

  handleTab = type => {
    this.setState({ activeTab: type });
    if (type === 'project') {
      this.getProject()
    } else if (type === 'link') {
      this.getLink()
    } else {
      this.getVideo();
    }
  };

  getVideo = () => {
    this.setState({ loading: true })
    service.getMenu({
      menu_id: PARAMS.video,
      parent_id: 1,
      image_type: 1
    }).then(res => {
      this.setState({
        products: res.data,
        loading: false
      })
    })
  };

  getLink = async () => {
    this.setState({ loading: true })
    const { data } = await service.getLink({
      menu_id: PARAMS.link,
      parent_id: 1,
      image_type: 3
    })
    this.setState({ loading: false, products: data })
  }

  getProject = async () => {
    this.setState({ loading: true })
    const data = await service.getMenu({
      menu_id: PARAMS.project,
      parent_id: 1,
      image_type: 3
    })
    this.setState({ loading: false, products: data.data })
  }

  goToPage = (v, index) => {
    if (this.state.activeTab === 'link') {
      Taro.navigateTo({ url: `/pages/link/index?menu_id=${v.menu_id}&product_name=${v.product_name}` });
    } else {
      Taro.navigateTo({ url: `/pages/program/index?name=${v.product_name}&parent_id=${index + 1}` })
    }
  };

  renderVideo = (products) => {
    return (
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
    )
  }

  renderProduct = (products) => {
    return (
      <View className="product">
        {products.map((v, index) => (
          <View
            className="product_item"
            key={v.image_id}
            onClick={this.goToPage.bind(null, v, index)}
          >
            <Image mode="widthFix" src={`${BASE_URL}${v.image_url}`} alt={v.image_name} />
            <View className="text">{v.product_name}</View>
          </View>
        ))}
      </View>
    )
  }

  render() {
    const { loading, products, project, activeTab } = this.state;
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
              {activeTab === 'video'
                ? this.renderVideo(products)
                : this.renderProduct(products)
              }
            </View>
          )}
      </View>
    );
  }
}
