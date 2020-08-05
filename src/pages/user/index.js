import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.less'
import order_img from '../../images/user/order.png'
import change_img from '../../images/user/change.png'
import avatar_img from '../../images/user/avatar.png'
import score_img from '../../images/user/score.png'
import address_img from '../../images/user/address.png'
import follow_img from '../../images/user/follow.png'
import custom_img from '../../images/user/customer.png'

@connect(({ user, common }) => ({
  ...common,
  ...user
}))
class User extends Component {
  config = {
    navigationBarTitleText: '我的',
  }

  componentDidMount() {
    if (this.props.open_id) {
      this.props.dispatch({
        type: 'user/querySign'
      })
      this.props.dispatch({
        type: 'user/queryUser'
      })
    }
  }

  goToPage = e => {
    if (!this.props.session_key) {
      Taro.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }
    Taro.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  }

  loginUser = (res) => {
    const userInfo = res.detail.userInfo
    this.props.dispatch({
      type: 'user/loginUser',
      payload: { ...userInfo }
    })
  }

  checkin = () => {
    const add_integral = 5
    this.props.dispatch({
      type: 'user/addScore',
      payload: { add_integral, forward_or_sign: 'Y' }
    }).then(() => {
      Taro.showToast({ title: `签到成功！积分+${add_integral}`, icon: "none" });
    })
  }

  onGetPhoneNumber = (e) => {
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      this.savePhoneNumber(e.detail)
    }
  }

  savePhoneNumber = (params) => {
    const data = {
      open_id: this.props.open_id,
      code: this.props.code,
      session_key: this.props.session_key,
      iv: params.iv,
      encryptedData: params.encryptedData
    }
    this.props.dispatch({
      type: 'user/savePhoneNumber',
      payload: data
    }).then(res => {
      if (res.data === 'ok') {
        this.checkin()
      }
    })
  }

  onShareAppMessage(res) {
    console.log(res)
    return {
      title: '自定义转发标题',
      path: `自定义转发的路径`,
      imageUrl: '自定义转发的图片',
      success: function (res) {
        console.log(res);
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }

  render() {
    let { nickName, avatarUrl, user_integral } = this.props
    const isLogin = Taro.getStorageSync('session_key')
    return (
      <View className="user-page">
        <View className="not-login">
          <View
            className="to-login"
          >
            <View className="avatar-container">
              <Image className="avatar" src={avatarUrl || avatar_img} />
            </View>
            <View className="right">
              <View className="msg" >
                {isLogin ? nickName : <Button
                  openType="getUserInfo"
                  onGetUserInfo={this.loginUser}
                >
                  请登录
                </Button>
                }
              </View>
              {
                isLogin &&
                <View>
                  {this.props.is_checked_in ? <View className="check-in">已签到</View> : (
                    <Button className="phone" openType="getPhoneNumber" onGetPhoneNumber={this.onGetPhoneNumber}>
                      每日签到
                    </Button>
                  )}
                </View>
              }
            </View>
          </View>
        </View>
        <View className="login">
          <View
            className="item"
          >
            <View className="left">
              <Image className="icon-left" src={score_img} />
              <Text>会员积分</Text>
              <Text className="score">{user_integral}</Text>
            </View>
          </View>
          <View
            className="item"
            data-url="/pages/order/index"
            onClick={this.goToPage}
          >
            <View className="left">
              <Image className="icon-left" src={order_img} />
              <Text>我的订单</Text>
            </View>
          </View>
          <View
            className="item"
            data-url="/pages/score/index"
            onClick={this.goToPage}
          >
            <View className="left">
              <Image className="icon-left" src={change_img} />
              <Text>我的福利</Text>
            </View>
          </View>
          <View
            className="item"
            data-url="/pages/addressList/index"
            onClick={this.goToPage}
          >
            <View className="left">
              <Image className="icon-left" src={address_img} />
              <Text>收货地址</Text>
            </View>
          </View>
          <View
            className="item"
            data-url="/pages/watch/index"
            onClick={this.goToPage}
          >
            <View className="left">
              <Image className="icon-left" src={follow_img} />
              <Text>我的收藏</Text>
            </View>
          </View>
          <View
            className="item"
            onClick={() => Taro.makePhoneCall({ phoneNumber: '18664212905' })}
          >
            <View className="left">
              <Image className="icon-left" src={custom_img} />
              <Text>在线客服</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default User
