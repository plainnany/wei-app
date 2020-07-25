/**
 * @description 电子画册详情
 */
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.less'
import { BASE_URL } from '../../config'
import service from '../home/service'
import Loading from '../../components/loading'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.getLinkDetail()
  }

  getLinkDetail = () => {
    this.setState({ loading: true })
    const { product_name, menu_id } = this.$router.params
    service.getLinkDetail({
      product_name,
      menu_id
    }).then(res => {
      this.setState({ loading: false, data: res.data })
    })
    Taro.setNavigationBarTitle({
      title: product_name
    })
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
                      onClick={this.goPageDetail.bind(null, v)}
                    >
                      <Image mode="widthFix" src={`${BASE_URL}${v.image_url}`} alt={v.image_name} />
                      <View className="text">{v.image_name}</View>
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
