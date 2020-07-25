import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.less'
import { BASE_URL } from '../../config'
import service from '../home/service'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      desc: []
    }
  }

  componentWillMount() { }

  componentDidMount() {
    this.getProduct()
  }

  getProduct = () => {
    const { id } = this.$router.params
    service.getBanner({
      menu_id: id,
      parent_id: 1,
      image_type: 1
    }).then(res => {
      this.setState({ desc: res.data })
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: '公司简介'
  }

  render() {

    return (
      <View className="wrap">
        {this.state.desc.map(v => <Image mode="widthFix" src={`${BASE_URL}${v.image_url}`} key={v.image_url} />)}
      </View>
    )
  }
}
