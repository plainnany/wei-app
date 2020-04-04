import { Component } from '@tarojs/taro'
import { View, Image, Navigator } from '@tarojs/components'
import MySwiper from './Swiper'
import './index.css'
import img from '../../asset/image/person2.png'
import Footer from '../../compoents/footer'

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '南山楠'
  }

  render() {
    const list = ['新品', '二次元', '动漫', '卡通', '番剧']
    return (
      <View className='home'>
        <MySwiper />
        {list.map(v => (
          <View className='content' key={v}>
            <Text className='title'>{v}</Text>
            <View className='list'>
              <View>
                <Navigator openType='navigate' url='/pages/productDetail/index'>
                  <Image src={img} />
                </Navigator>
              </View>
              <View>
                <Navigator openType='navigate' url='/pages/productDetail/index'>
                  <Image src={img} />
                </Navigator>
              </View>
              <View>
                <Navigator openType='navigate' url='/pages/productDetail/index'>
                  <Image src={img} />
                </Navigator>
              </View>
              <View>
                <Navigator openType='navigate' url='/pages/productDetail/index'>
                  <Image src={img} />
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
