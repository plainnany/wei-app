import Taro, { Component } from '@tarojs/taro'
import { View, Text, Icon } from '@tarojs/components'
import './index.css'
import Footer from '../../compoents/footer'

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '个人中心'
  }

  render() {
    return (
      <View>
        <View className='wrap'>
          <View className="header">
            <View className="avatar">avatar</View>
            <Text>点击登录</Text>
          </View>
          {/* <View>
            <View>
              <Icon type="success" size={20} />
              <Text>tab1</Text>
            </View>
            <View>
              <Icon type="success" size={20} />
              <Text>tab2</Text>
            </View>
          </View> */}
          <View className="content">
            <View><Icon type="waiting" size={16} /><Text>会员信息</Text></View>
            <View><Icon type="waiting" size={16} /><Text>优惠券</Text></View>
            <View><Icon type="waiting" size={16} /><Text>抽奖</Text></View>
            <View><Icon type="waiting" size={16} /><Text>用户反馈</Text></View>
          </View>
        </View>
        <Footer />
      </View>
    )
  }
}
