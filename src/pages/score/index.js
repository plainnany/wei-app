import Taro, { Component } from "@tarojs/taro";
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
      data: {},
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
  };

  exchangeScore = v => {
    if (this.checkAddress()) {
      if (this.props.user_integral < v.present_integral) {
        Taro.showToast({
          title: '用户积分不足，无法兑换'
        })
        return
      }
      this.setState({ visible: true, data: v });
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
    const { present_id, present_integral } = this.state.data
    this.props.dispatch({
      type: 'score/coinPresent',
      payload: {
        present_id,
        present_integral
      }
    }).then(() => {
      this.setState({ visible: false })
    })
  };


  render() {
    const { product_list, effects } = this.props;
    const loading = effects["score/getPresent"];
    return (
      <View className="score-page">
        <View className="product">
          {/* {loading ? 'loading' : <View>pro</View>} */}
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
                  {/* <View>{v.present_desc}</View> */}
                  <Text className="price">{v.present_integral} 积分 |</Text>
                  <Text className="price">{v.present_num} 库存</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <AtModal
          isOpened={this.state.visible}
          title="确认要兑换么？"
          content={`将消耗${this.state.data.present_integral}积分`}
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
