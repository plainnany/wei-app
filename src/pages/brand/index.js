import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Video } from "@tarojs/components";
// import { Video } from 'taro-ui'
import "./index.less";
import Loading from "../../components/loading";
import service from '../home/service'
import { BASE_URL, PARAMS } from '../../config'
import { connect } from "@tarojs/redux";

@connect(({ home }) => ({
  ...home
}))
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.swtich_brand_tab || 'link',
      products: [],
      project: []
    };
  }

  componentWillMount() { }

  componentDidMount() {
    this.handleTab(this.state.activeTab)
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'home/save',
      payload: { swtich_brand_tab: '' }
    })
  }

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
      Taro.navigateTo({ url: `/pages/album/index?menu_id=${v.menu_id}&product_name=${v.product_name}` });
    } else {
      let name = v.product_name
      if (this.state.activeTab === 'project') {
        name = v.image_name.split('.')[0]
      }
      Taro.navigateTo({ url: `/pages/program/index?name=${name}&parent_id=${index + 1}` })
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
            <Video
              src={`${BASE_URL}${v.product_collect}`}
              controls
              poster={`${BASE_URL}${v.image_url}`}
              objectFit="fill"
            />
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
            {this.state.activeTab === 'link' && <View className="text">{v.product_name}</View>}
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
            <View
              className={`tab_item ${activeTab === v.type ? 'tab_item_active' : ''}`}
              key={v.type}
            >
              <Text
                onClick={this.handleTab.bind(null, v.type)}
              >
                {v.title}
              </Text>
              {activeTab === v.type && <View className="tab_item_active_bar" />}
            </View>
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
