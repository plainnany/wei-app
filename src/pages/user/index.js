import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.less'
import message_img from '../../images/user/message.png'
import avatar_img from '../../images/user/avatar.png'
import coupon_img from '../../images/user/coupon.png'
import about_img from '../../images/user/about.png'
import address_img from '../../images/user/address.png'

@connect(({ user, common }) => ({
  ...common,
  ...user
}))
class User extends Component {
  config = {
    navigationBarTitleText: '我的',
  }

  goPage = e => {
    // if (
    //   e.currentTarget.dataset.url == '/pages/login/index' &&
    //   this.props.access_token
    // ) {
    //   return
    // }
    // Taro.navigateTo({
    //   url: e.currentTarget.dataset.url,
    // })
  }

  goToPage = e => {
    if (!this.props.access_token) {
      // Taro.navigateTo({
      //   url: '/pages/login/index',
      // })
      this.login(e)
      return
    }
    Taro.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  }

  outLogin = e => {
    e.stopPropagation()
    if (!this.props.access_token) {
      Taro.navigateTo({
        url: '/pages/login/index',
      })
      return
    }
    Taro.showModal({
      content: '是否退出当前账号？',
    }).then(res => {
      if (res.confirm) {
        Taro.removeStorageSync('user_info')
        Taro.removeStorageSync('access_token')
        this.props.dispatch({
          type: 'cart/init',
        })
        this.props.dispatch({
          type: 'common/save',
          payload: {
            access_token: '',
            invitation_code: '',
            mobile: '',
            nickname: '',
            new_user: '',
            is_has_buy_card: '',
            erroMessage: '',
          },
        })
        this.props.dispatch({
          type: 'login/save',
          payload: {
            access_token: '',
            invitation_code: '',
            mobile: '',
            nickname: '',
            new_user: '',
            is_has_buy_card: '',
            erroMessage: '',
          },
        })
      }
    })
  }

  login = (e) => {
    Taro.getUserInfo({
      success: (res) => {
        console.log('get user info', res)
        this.onGetUserInfo({
          detail: res
        })
        Taro.navigateTo({
          url: e.currentTarget.dataset.url,
        })
      }
    })
  }

  onGetUserInfo = (res) => {
    const userInfo = res.detail.userInfo
    const userData = {
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName,
      gender: userInfo.gender
    };
    this.props.dispatch({
      type: 'user/save',
      payload: {
        ...userData,
        access_token: 'test token'
      }
    })
  }

  checkin = () => {
    this.props.dispatch({
      type: 'user/checkin',
      payload: {}
    })
  }

  render() {
    let { mobile, coupon_number, nickname, list, avatarUrl, nickName } = this.props
    console.log(nickname)
    return (
      <View className="user-page">
        <View className="not-login">
          <View
            className="to-login"
            data-url="/pages/login/index"
            onClick={this.goPage}
          >
            <View className="avatar-container">
              <Image className="avatar" src={avatarUrl || avatar_img} />
            </View>
            <View className="right">
              <View
                className="msg"
                data-url="/pages/message/index"
                onClick={this.goToPage}
              >
                {nickName || <Button
                  openType="getUserInfo"
                  onGetUserInfo={this.onGetUserInfo}
                >
                  请登录 >
                </Button>}
              </View>
              {
                this.props.access_token &&
                <View className="check-in" onClick={this.checkin}>
                  {this.props.is_checked_in ? '已签到' : '每日签到'}
                </View>
              }
            </View>
          </View>
          {/* <View className="list">
            {list &&
              list.map((item, index) => (
                <View
                  className="item"
                  key={index}
                  data-url={`/pages/order/index?type=${index}`}
                  onClick={this.goToPage}
                >
                  <Image mode="widthFix" src={item.img} />
                  <Text>{item.txt}</Text>
                  {item.num > 0 && <Icon className="num">{item.num}</Icon>}
                </View>
              ))}
          </View> */}
        </View>
        <View className="login">
          {/* <View className="card">
            <View className="type type0">
              <View className="operation">
                <View className="txt">
                  {mobile ? 'VIP会员用户' : '您还不是会员'}
                </View>
                {!mobile && (
                  <View
                    className="btn"
                    data-url="/pages/login/index"
                    onClick={this.goPage}
                  >
                    成为会员
                    <View className="iconfont icon-membership_more" />
                  </View>
                )}
              </View>
            </View>
          </View> */}
          <View
            className="item"
            data-url="/pages/addressList/index"
            onClick={this.goToPage}
          >
            <View className="left">
              <Image className="icon-left" src={address_img} />
              <Text>会员信息</Text>
            </View>
          </View>
          <View
            className="item"
            data-url="/pages/addressList/index"
            onClick={this.goToPage}
          >
            <View className="left">
              <Image className="icon-left" src={address_img} />
              <Text>我的订单</Text>
            </View>
          </View>
          <View
            className="item"
            data-url="/pages/score/index"
            onClick={this.goToPage}
          >
            <View className="left">
              <Image className="icon-left" src={address_img} />
              <Text>积分兑换</Text>
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
            <View className="right">
              {coupon_number && <View className="num">{coupon_number}</View>}
              <View className="iconfont icon-more arrow" />
            </View>
          </View>
          {/* <View
            className="item"
            data-url="/pages/couponList/index"
            onClick={this.goToPage}
          >
            <View className="left">
              <Image className="icon-left" src={coupon_img} />
              <Text>优惠券</Text>
            </View>
            <View className="right">
              {coupon_number && <View className="num">{coupon_number}</View>}
              <View className="iconfont icon-more arrow" />
            </View>
          </View> */}
          <View
            className="item"
            data-url="/pages/about/index"
            onClick={this.goToPage}
          >
            <View className="left">
              <Image className="icon-left" src={about_img} />
              <Text>关于</Text>
            </View>
            <View className="right">
              <View className="iconfont icon-more arrow" />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

function mapStateToProps() {

}

export default User
