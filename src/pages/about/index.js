import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './index.less';

export default class About extends Component {
  config = {
    navigationBarTitleText: '关于',
  };

  componentDidMount = () => { };

  render() {
    return (
      <View className="about-page">
        <Image src="https://i.loli.net/2020/04/06/SDJRfo6AOvQZ3yh.jpg" />
      </View>
    );
  }
}
