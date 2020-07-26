import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.less'
import { BASE_URL } from '../../config'
import service from '../product/service'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productDetail: []
    }
  }

  componentWillMount() { }

  componentDidMount() {
    this.getProduct()
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  }

  getProduct = () => {
    const { id, title } = this.$router.params
    service.getNewProductDetail({
      menu_id: id,
      product_name: title
    }).then(res => {
      this.setState({ productDetail: res.data })
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '商品详情'
  }

  render() {

    return (
      <View className='product-detail-page'>
        {this.state.productDetail.map(v => <Image mode="widthFix" src={`${BASE_URL}${v.image_url}`} key={v.image_url} />)}
      </View>
    )
  }
}
