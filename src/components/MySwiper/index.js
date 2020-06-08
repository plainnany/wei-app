import Taro, { Component } from '@tarojs/taro'
import { Swiper, SwiperItem, Image } from '@tarojs/components'
import PropTypes from 'prop-types'
import './index.less'
import { BASE_URL } from '../../config'

export default class MySwiper extends Component {
  static propTypes = {
    banner: PropTypes.array,
    // home: PropTypes.bool,
  }

  static defaultProps = {
    banner: [],
    // home: false,
  }

  render() {
    const { banner } = this.props
    return (
      <Swiper
        className={'swiper'}
        circular
        indicatorDots
        indicatorColor="#999"
        indicatorActiveColor="#bf708f"
        autoplay
      >
        {banner.map((item, index) => (
          <SwiperItem key={index}>
            <Image src={`${BASE_URL}${item.image_url}`} />
          </SwiperItem>
        ))}
      </Swiper>
    )
  }
}
