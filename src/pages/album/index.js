/**
 * @description 电子画册详情
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import PropTypes from 'prop-types'
import './index.less'
import { BASE_URL } from '../../config'
import service from '../home/service'
import Loading from '../../components/loading'

export default class MySwiper extends Component {
  // static propTypes = {
  //   banner: PropTypes.array,
  // }

  // static defaultProps = {
  //   banner: [],
  // }


  state = {
    banner: []
  }

  componentDidMount() {
    this.getLinkDetail()
  }

  getLinkDetail = () => {
    this.setState({ loading: true })
    const { product_name, menu_id } = this.$router.params
    service.getLinkDetail({
      product_name,
      menu_id
    }).then(res => {
      this.setState({
        loading: false,
        banner: res.data.detail || []
      })
    })
    Taro.setNavigationBarTitle({
      title: product_name
    })
  }

  render() {
    const { banner } = this.state
    return (
      <Swiper
        className={'swiper'}
        circular
        indicatorDots
        indicatorColor="#999"
        indicatorActiveColor="#bf708f"
        style={{ height: '100%' }}
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
