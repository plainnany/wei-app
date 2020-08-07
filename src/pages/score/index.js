import Taro, { Component, connectSocket } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtModal } from 'taro-ui'
import { connect } from "@tarojs/redux";
import "./index.less";
import { BASE_URL } from '../../config'

@connect(({ score, loading, user }) => ({
  ...score,
  ...loading,
  ...user
}))
class ScorePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      present: {},
      coin_num: 0
    };
  }

  config = {
    navigationBarTitleText: "积分兑换"
  };

  componentDidMount = () => {
    this.props.dispatch({
      type: "score/getPresent"
    })

    this.props.dispatch({
      type: 'user/queryUser'
    })

    Taro.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  };

  exchangeScore = v => {
    if (this.checkAddress()) {
      if (this.props.user_integral < v.present_integral) {
        Taro.showToast({
          title: '用户积分不足，无法兑换',
          icon: 'none'
        })
        return
      }
      this.setState({ visible: true, present: v });
    }
  };

  hideModal = () => {
    this.setState({ visible: false });
  };

  checkAddress = () => {
    if (this.props.addressList.length) {
      return true
    }
    Taro.showToast({
      title: '暂无收货地址，请先去添加',
      icon: "none"
    })
    Taro.navigateTo({ url: '/pages/addressList/index' })
  }

  confirmExchangeScore = () => {
    const { present_id, present_integral } = this.state.present
    this.props.dispatch({
      type: 'score/coinPresent',
      payload: {
        present_id,
        present_integral
      }
    }).then(() => {
      this.updateData(present_id, present_integral)
      this.setState({ visible: false })
    })

  };

  updateData = (present_id, present_integral) => {
    const product_list = [...this.props.product_list]
    const index = product_list.findIndex(v => v.present_id === present_id)
    const user_integral = this.props.user_integral - present_integral
    product_list.splice(index, 1, {
      ...this.state.present,
      present_num: this.state.present.present_num - 1
    })

    this.props.dispatch({
      type: 'score/save',
      payload: { product_list }
    })

    this.props.dispatch({
      type: 'user/save',
      payload: { user_integral }
    })
  }

  render() {
    const { product_list, effects } = this.props;
    const loading = effects["score/getPresent"];
    return (
      <View className="score-page">
        <View className="product">
          <View className="product-list">
            {product_list.map(v => (
              <View
                className="product-item"
                key={v.id}
                onClick={this.exchangeScore.bind(null, v)}
              >
                <Image src={`${BASE_URL}${v.present_url}`} alt="图片" />
                <View>
                  <View>{v.present_name}</View>
                  <Text className="price">{v.present_integral} 积分 | </Text>
                  <Text className="price">{v.present_num} 库存</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <AtModal
          isOpened={this.state.visible}
          title="确认要兑换么？"
          content={`将消耗${this.state.present.present_integral}积分`}
          onConfirm={this.confirmExchangeScore}
          onCancel={this.hideModal}
          confirmText="确认"
          cancelText="取消"
        />
      </View>
    );
  }
}

export default ScorePage;
