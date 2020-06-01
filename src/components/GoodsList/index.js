import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import PropTypes from "prop-types";
import "./index.less";

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
              >
                更多
              </Navigator>
            </View>
            <View className="list">
              {v.imageList.map(item => (
                <View key={item} className="list-item">
                  <Navigator
                    openType="navigate"
                    url={`/pages/productDetail/index?type=${item}`}
                  >
                    <Image src={item} className="list-item-image" />
                    <View>
                      <Text>jshdhf产品描述</Text>
                      <Text className="price">¥ 1200</Text>
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
