import Taro, { Component } from '@tarojs/taro'
import { View, Image, Navigator } from '@tarojs/components'
import MySwiper from '../../components/MySwiper'
import './index.less'
import Footer from '../../components/footer'
import service from './service'
import mockData from '../../mock/index'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      banner: [],
      products: []
    }
  }

  componentWillMount() { }

  componentDidMount() {
    this.getProducts()
    this.getBanner()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  getBanner() {
    this.setState({ loading: true })
    service.getBanner().then(res => {
      this.setState({ banner: res.data })
    }).catch(err => {
      this.setState({ banner: mockData.banners })
    })
  }

  getProducts() {
    service.getProduct().then(res => {
      this.setState({ products: res.data })
    }).catch(err => {
      this.setState({ products: mockData.products })
    })
  }

  config = {
    navigationBarTitleText: '南山楠'
  }

  render() {
    const products = this.state.products
    return (
      <View className='home'>
        <MySwiper banner={this.state.banner} />
        {products.map(v => (
          <View className='content' key={v.id}>
            <View className='title'>
              <Text>
                {v.title}
              </Text>
              <Navigator className="more" openType='switchTab' url={`/pages/product/index?type=${v.type}`}>
                更多
              </Navigator>
            </View>
            <View className='list'>
              <View>
                <Navigator openType='navigate' url='/pages/productDetail/index'>
                  <Image src={v.image_url} />
                </Navigator>
              </View>
              <View>
                <Navigator openType='navigate' url='/pages/productDetail/index'>
                  <Image src={v.image_url} />
                </Navigator>
              </View>
              <View>
                <Navigator openType='navigate' url='/pages/productDetail/index'>
                  <Image src={v.image_url} />
                </Navigator>
              </View>
              <View>
                <Navigator openType='navigate' url='/pages/productDetail/index'>
                  <Image src={v.image_url} />
                </Navigator>
              </View>
            </View>
          </View>
        ))}
        <Footer />
      </View>
    )
  }
}
