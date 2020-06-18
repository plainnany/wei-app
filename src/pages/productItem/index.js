/**
 * @description 粉末涂料，水性涂料
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.less'
import { BASE_URL } from '../../config'
import Loading from '../../components/loading'

@connect(({ product, loading }) => ({
  ...product,
  ...loading
}))
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: '',
      tabs: [],
      product_list: []
    }
  }

  componentWillMount() { }

  componentDidMount() {
    this.getProduct()

  }

  getProduct = () => {
    const menu_id = this.$router.params.id
    this.props.dispatch({
      type: 'product/load',
      payload: {}
    }).then(data => {
      const parent = data.find(v => v.menu_id === menu_id) || {}
      const tabs = parent.child || []
      const tab = tabs[0] || {}
      const activeTab = tab.menu_id
      const product_list = tab.child || []
      this.setState({
        activeTab,
        tabs,
        product_list,
        dataSource: data
      });
    });
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: ''
  }

  handleTab = (menu_id) => {
    const tabs = this.state.tabs
    const tab = tabs.find(v => v.menu_id === menu_id) || {}
    const product_list = tab.child || []
    this.setState({ activeTab: menu_id, product_list })
  }

  goPageDetail = (v) => {
    Taro.navigateTo({
      url: `/pages/product/list?id=${v.menu_id}`
    });
  }

  render() {
    const { tabs, product_list, activeTab } = this.state
    const { menu_list, effects } = this.props
    const loading = effects['product/load']
    return (
      <View className="wrap">
        {
          loading ? <Loading /> : (
            menu_list.length === 0 ? <View className="empty">暂无数据</View> : (
              <View>
                <View className="tab">
                  {tabs.map(v => (
                    <Text
                      className={`tab_item ${activeTab === v.menu_id ? "tab_item_active" : ""}`}
                      key={v.menu_id}
                      onClick={this.handleTab.bind(null, v.menu_id)}
                    >
                      {v.menu_name}
                    </Text>
                  ))}
                </View>
                <View className="content">
                  <View className="product">
                    {product_list.map(v => (
                      <View
                        className="product_item"
                        key={v.menu_id}
                        onClick={this.goPageDetail.bind(null, v)}
                      >
                        <Image src={`${BASE_URL}${v.menu_url}`} alt={v.image_name} />
                        <View className="text">{v.menu_name}</View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )
          )
        }
      </View>
    )
  }
}
