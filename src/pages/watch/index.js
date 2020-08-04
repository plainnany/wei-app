import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { connect } from '@tarojs/redux'
import "./index.less";
import { BASE_URL } from '../../config'
import service from './service'
import Loading from '../../components/loading'

@connect(({ user }) => ({
  ...user
}))
class ScorePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      loading: true
    };
  }

  config = {
    navigationBarTitleText: "我的收藏"
  };

  componentDidMount = () => {
    service.getWatchedProduct({
      open_id: this.props.open_id
    }).then(res => {
      this.setState({
        products: res.data,
        loading: false
      })
    })
  };

  render() {
    const { products } = this.state
    return (
      <View className="wrap">
        {
          this.state.loading
            ? <Loading />
            : products.length === 0
              ? '暂无数据'
              : this.state.products.map(product => (
                <View
                  className="list-item"
                  key={product.id}
                  onClick={() => Taro.navigateTo({ url: `/pages/productDetail/index?id=${product.menu_id}&image_id=${product.image_id}&title=${product.product_name}` })}
                >
                  <Image src={`${BASE_URL}${product.image_url}`} />
                  <Text>
                    {product.product_name}
                  </Text>
                </View>
              ))
        }
      </View>
    );
  }
}

export default ScorePage;
