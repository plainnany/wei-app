import { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import './Swiper.css'
import img from '../../asset/image/person.png'
import img1 from '../../asset/image/person2.png'
import img2 from '../../asset/image/person3.png';

export default class App extends Component {
  render() {
    return (
      <Swiper
        className='swiper'
        indicatorColor='#999'
        indicatorActiveColor='#333'
        circular
        indicatorDots
        autoplay
      >
        <SwiperItem style={{ width: '100%' }}>
          <Image src="https://p4.music.126.net/CGshVoj_5mDyYUWuRaI4tw==/18983068253749791.jpg" />
        </SwiperItem>
        <SwiperItem>
          <Image src={img1} />
        </SwiperItem>
        <SwiperItem>
          <Image src={img2} />
        </SwiperItem>
      </Swiper>
    )
  }
}
