import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import qs from 'qs'
import './index.less'
import wechat_img from '../../images/icon/wechat.png'

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

  onGetUserInfo = (res) => {
    const userInfo = res.detail.userInfo
    this.props.dispatch({
      type: 'user/loginUser',
      payload: { ...userInfo }
    }).then(() => {
      Taro.showToast({ title: '登录成功，即将跳转...', icon: 'none' })
      const { redirectPath, ...restParams } = this.$router.params
      const params = qs.stringify(restParams)
      Taro.redirectTo({ url: `${this.$router.params.redirectPath}?${params}` })
    })
  }

  render() {
    return (
      <View class="auth">
        <Image src={wechat_img} class="img" mode="aspectFill"></Image>
        <View class="title">微信授权页面</View>
        <View class="describe">此页面是微信授权页面，点击下方按钮弹出授权或跳转页面</View>
        <Button class="btn" openType="getUserInfo" onGetUserInfo={this.onGetUserInfo}>点击微信授权</Button>
      </View>
    )
  }
}

export default Index


