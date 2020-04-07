import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
import mockData from '../../mock/index'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 'new',
      products: []
    }
  }

  componentWillMount() { }

  componentDidMount() {
    this.getProduct('new')
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '产品'
  }

  handleTab = (type) => {
    this.setState({ activeTab: type })
    this.getProduct(type)
  }

  getProduct = type => {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ products: mockData.productsByType, loading: false })
    }, 100);
  }

  render() {
    return (
      <View className='wrap'>
        <View className='tab'>
          {mockData.products.map(v => (
            <Text
              className={`tab_item ${this.state.activeTab === v.type ? 'tab_item_active' : ''}`}
              key={v.title}
              onClick={this.handleTab.bind(null, v.type)}
            >
              {v.title}
            </Text>
          ))}
        </View>
        {
          this.state.loading ? '加载中...' : (
            <View className='list'>
              {this.state.products.map(v => (
                <View className='list_item' key={v.id}>
                  <View>
                    <Navigator openType='navigate' url={`/pages/productDetail/index?id=${v.id}`}>
                      <Image src={v.image_url} />
                      <View className='ellipsis'><Text>{v.title}</Text></View>
                      <View className='ellipsis'><Text className='desc'>{v.description}</Text> </View>
                    </Navigator>
                  </View>
                </View>
              ))}
            </View>
          )
        }
      </View>
    )
  }
}
