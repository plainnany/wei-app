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

  static windowWidth = 0

  state = {
    heights: []
  }

  componentDidMount() {
    wx.getSystemInfo({
      success: (res) => {
        this.windowWidth = res.windowWidth
      }
    })
  }

  onLoad = (e) => {
    const heights = this.state.heights
    const ratio = e.detail.width / e.detail.height
    // 按照宽高比计算图片宽度 100% 时的高度
    const imgHeight = this.windowWidth / ratio
    heights.push(imgHeight)
    this.setState({ heights })
  }

  render() {
    const { banner } = this.props
    const maxHeight = Math.max.apply(null, this.state.heights)
    return (
      <Swiper
        className={'swiper'}
        circular
        indicatorDots
        indicatorColor="#999"
        indicatorActiveColor="#bf708f"
        autoplay
        style={{ height: `${maxHeight}px` }}
      >
        {banner.map((item, index) => (
          <SwiperItem key={index}>
            <Image mode="widthFix" src={`${BASE_URL}${item.image_url}`} onLoad={this.onLoad} />
          </SwiperItem>
        ))}
      </Swiper>
    )
  }
}
