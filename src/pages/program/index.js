/**
 * @description 工程案例详情
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.less'
import service from '../home/service'
import { BASE_URL, PARAMS } from '../../config'
import Loading from '../../components/loading'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentWillMount() { }

  componentDidMount() {
    this.getProject(this.$router.params.name)
    Taro.setNavigationBarTitle({
      title: this.$router.params.name
    })
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  }

  getProject = async () => {
    this.setState({ loading: true })
    const { data } = await service.getMenu({
      menu_id: PARAMS.project,
      parent_id: this.$router.params.parent_id,
      image_type: 1
    })
    this.setState({ loading: false, data })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  config = {
    navigationBarTitleText: ''
  }

  render() {
    const { data, loading } = this.state
    return (
      <View className="wrap">
        {
          loading ? <Loading /> : (
            data.length === 0 ? <View className="empty">暂无数据</View> : (
              <View className="content">
                <View className="product">
                  {data.map(v => (
                    <View
                      className="product_item"
                      key={v.image_id}
                    // onClick={this.goPageDetail.bind(null, v)}
                    >
                      <Image mode="widthFix" src={`${BASE_URL}${v.image_url}`} alt={v.image_name} />
                      <View className="text">{v.product_name}</View>
                    </View>
                  ))}
                </View>
              </View>
            )
          )
        }
      </View>
    )
  }
}
