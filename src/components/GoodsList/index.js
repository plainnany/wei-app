import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Navigator } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from '@tarojs/redux'
import "./index.less";
import { BASE_URL, PARAMS } from "../../config";

@connect(({ user, home, loading }) => ({
  ...user,
  ...home,
  ...loading
}))
class GoodsList extends Component {
  static propTypes = {
    list: PropTypes.array
  };

  static defaultProps = {
    list: []
  };

  gotoDetail = item => {
    const url = `/pages/productDetail/index?id=${item.menu_id}&title=${item.product_name}`
    if (!this.props.open_id) {
      Taro.showToast({
        title: '暂无登录，请先授权登录',
        icon: 'none'
      })
      Taro.navigateTo({ url: `/pages/auth/index?redirectPath=/pages/productDetail/index&id=${item.menu_id}&title=${item.product_name}` })
      return
    }
    Taro.navigateTo({ url });
  };

  renderList = products => {
    return (
      <View>
        {products.map(v => (
          <View className="content" key={v.id}>
            <View className="title">
              <Text>{v.title}</Text>
            </View>
            <View className="banner">
              <Navigator
                className="more"
                openType="switchTab"
                url={`/pages/product/index`}
                hoverClass="none"
              >
                <Image mode="widthFix" src={`${BASE_URL}${v.banner}`} />
              </Navigator>
            </View>
            <View className="list">
              {v.imageList.map(item => (
                <View key={item.image_id} className="list-item">
                  <View onClick={() => this.gotoDetail(item)}>
                    <Image
                      mode="widthFix"
                      src={`${BASE_URL}${item.image_url}`}
                      className="list-item-image"
                    />
                    <View className="list-text">
                      <Text>{item.product_name}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  };

  renderLoading = () => {
    return (
      <View className="loadMoreGif">
        <View className="loading" />
        <View className="text">加载中...</View>
      </View>
    );
  };

  render() {
    const { list, loading } = this.props;
    return (
      <View className="goods-list-container">
        {loading ? (
          this.renderLoading()
        ) : list.length > 0 ? (
          this.renderList(list)
        ) : (
              <View>暂无数据</View>
            )}
      </View>
    );
  }
}

export default GoodsList;
