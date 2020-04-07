import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
import mockData from '../../mock'

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '产品详情'
  }

  render() {
    const productImage = mockData.productDetail[`${parseInt(Math.random() * 3)}`]

    return (
      <View className='product-detail-page'>
        <Image src={productImage} />
      </View>
    )
  }
}
