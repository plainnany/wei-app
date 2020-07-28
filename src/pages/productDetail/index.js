import Taro, { Component, getUserInfo } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtFloatLayout, AtButton } from "taro-ui"
import { connect } from '@tarojs/redux'
import './index.less'
import { BASE_URL } from '../../config'
import service from '../product/service'
import watchService from '../watch/service'
import home_icon from '../../images/tab/home.png'

@connect(({ user }) => ({
  ...user
}))
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productDetail: { product: {}, detail: [] },
      loading: true,
      confirmLoading: false,
      visible: false,
      watched: false
    }
  }

  componentDidMount() {
    this.getProduct()
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  }

  getProduct = () => {
    const { id, title } = this.$router.params
    service.getProductDetail({
      menu_id: id,
      product_name: title
    }).then(res => {
      this.setState({
        productDetail: res.data,
        watched: (res.data.product || {}).product_collect === '1',
        loading: false
      })
    })
  }

  config = {
    navigationBarTitleText: '商品详情'
  }

  showModal = () => {
    this.setState({ visible: true })
  }

  hideModal = () => {
    this.setState({ visible: false })
  }

  handleWatch = () => {
    if (!this.props.session_key) {
      return
    }
    const watched = this.state.watched
    this.setState({ confirmLoading: true })
    watchService.watchProduct({
      product_collect: watched ? 0 : 1,
      image_id: this.$router.params.image_id
    }).then(res => {
      if (res.data === 'ok') {
        this.setState({
          watched: !watched,
          confirmLoading: false
        })
      } else {
        Taro.showToast({ title: '收藏失败', icon: 'none' })
        this.setState({
          confirmLoading: false
        })
      }
    })
  }

  getUserInfo = (res) => {
    const userInfo = res.detail.userInfo
    this.props.dispatch({
      type: 'user/loginUser',
      payload: { ...userInfo }
    }).then(res => {
      this.handleWatch()
    })
  }

  render() {
    const { loading } = this.state
    const { product, detail } = this.state.productDetail
    return (
      <View className='product-detail-page'>
        <View className="card">
          {product.image_url && <Image src={`${BASE_URL}${product.image_url}`} mode="widthFix" />}
        </View>
        <View className="desc card">
          <Text>规格描述</Text>
          <Text className="view" onClick={this.showModal}>查看</Text>
        </View>
        <AtFloatLayout
          isOpened={this.state.visible}
          title="规格描述"
          onClose={this.hideModal}
        >
          {product.describe_msg}
        </AtFloatLayout>
        <View className="card">
          <Text>图文详情</Text>
          {detail.map(v => <Image mode="widthFix" src={`${BASE_URL}${v.image_url}`} key={v.image_url} />)}
        </View>
        <View className="footer">
          <View onClick={() => Taro.switchTab({ url: '/pages/home/index' })}>
            <View className="home"><Image src={home_icon} /></View>
            <Text>首页</Text>
          </View>
          <View className="watch">
            <AtButton
              type='primary'
              onClick={this.handleWatch}
              loading={this.state.confirmLoading}
              openType={this.props.session_key ? '' : 'getUserInfo'}
              onGetUserInfo={this.getUserInfo}
            >
              {this.state.watched ? '取消收藏' : '加入收藏'}
            </AtButton>
          </View>
          {/* <View className="watch" onClick={this.handleWatch}>
            加入收藏
            </View> */}
        </View>
      </View>
    )
  }
}

export default Index
