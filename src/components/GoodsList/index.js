import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Navigator } from "@tarojs/components";
import PropTypes from "prop-types";
import { connect } from '@tarojs/redux'
import "./index.less";
import { BASE_URL, PARAMS } from "../../config";

@connect(({ home, loading }) => ({
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

  gotoDetail = e => {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${e.currentTarget.dataset.id}`
    });
  };

  renderList = products => {
    return (
      <View>
        {products.map(v => (
          <View className="content" key={v.id}>
            <View className="title">
              <Text>{v.title}</Text>
              <Navigator
                className="more"
                openType="switchTab"
                url={`/pages/product/index?type=${v.type}`}
                hoverClass="none"
              >
                更多
              </Navigator>
            </View>
            <View className="banner"><Image mode="widthFix" src={`${BASE_URL}${v.banner}`} /></View>
            <View className="list">
              {v.imageList.map(item => (
                <View key={item.image_id} className="list-item">
                  <Navigator
                    openType="navigate"
                    url={`/pages/productDetail/index?id=${item.menu_id}&image_id=${item.image_id}&title=${item.product_name}`}
                    hoverClass="none"
                  >
                    <Image
                      mode="widthFix"
                      src={`${BASE_URL}${item.image_url}`}
                      className="list-item-image"
                    />
                    <View className="list-text">
                      <Text>{item.product_name}</Text>
                    </View>
                  </Navigator>
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
