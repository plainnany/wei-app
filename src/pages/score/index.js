import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux'
import './index.less';
import Modal from '../../components/Modal'

@connect(({ score, loading }) => ({
  ...score,
  ...loading
}))
class ScorePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  config = {
    navigationBarTitleText: '积分兑换',
  };

  componentDidMount = () => {
    this.props.dispatch({
      type: 'score/getProduct'
    })
  };

  exchangeScore = (v) => {
    this.setState({ visible: true })
    console.log('cancel')

  }

  hideModal = () => {
    this.setState({ visible: false })
    console.log('cancel')
  }

  confirmExchangeScore = () => {
    console.log('hrhr')
    Taro.showToast({
      title: '兑换成功'
    })
    this.setState({ visible: false })
  }

  render() {
    const { product_list, effects } = this.props
    const loading = effects['score/getProduct']
    return (
      <View className="score-page">
        <View className="product">
          {/* {loading ? 'loading' : <View>pro</View>} */}
          <View className="product-list">
            {product_list.map(v => (
              <View className="product-item" key={v.id} onClick={this.exchangeScore.bind(null, v)}>
                <Image src="" alt="图片" />
                <Text>10积分</Text>
              </View>
            ))}
          </View>
        </View>
        <Modal
          title="将消耗20积分"
          content="hehe"
          visible={this.state.visible}
          onOK={this.confirmExchangeScore}
          onCancel={this.hideModal}
        />
      </View>
    );
  }
}

export default ScorePage
