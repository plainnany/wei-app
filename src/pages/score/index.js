import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.less';

export default class About extends Component {
  config = {
    navigationBarTitleText: '关于',
  };

  componentDidMount = () => { };

  render() {
    return (
      <View className="score-page">
        <Text>暂无积分</Text>
      </View>
    );
  }
}
