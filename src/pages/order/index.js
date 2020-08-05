/**
 * 我的订单处理
 */

import Taro, { Component } from "@tarojs/taro"
import { View, Text, Video, Image } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import "./index.less"
import Loading from "../../components/loading"
import service from './service'
import { BASE_URL, PARAMS } from '../../config'

@connect(({ user }) => ({
  ...user
}))
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: []
    }
  }

  componentWillMount() { }

  componentDidMount() {
    this.getProduct()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: "我的订单"
  }

  getProduct = () => {
    this.setState({ loading: true })
    service.queryCoin({
      open_id: this.props.open_id
    }).then(res => {
      this.setState({
        orders: res.data,
        loading: false
      })
    })
  }

  render() {
    const { loading, orders } = this.state
    return (
      <View className="wrap">
        {loading ? (
          <Loading />
        ) : (
            orders.length === 0
              ? <View className="empty">暂无数据</View>
              : <View className="content">
                <View className="order">
                  {orders.map((v, index) => (
                    <View
                      className="order_item"
                      key={index}
                    >
                      <View className="present">
                        <View>礼品 {v.present_name} × {v.coin_num}</View>
                      </View>
                      <View className="concat">
                        <View>收货地址: {v.consignee_address}</View>
                        <View>收货人: {v.consignee_name}</View>
                        <View>手机号: {v.consignee_phone}</View>
                        <View>运单号: {v.waybill_num || '暂无运单号'}</View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
          )}
      </View>
    )
  }
}

export default Index
