import Taro, { Component } from "@tarojs/taro";
import { WebView } from "@tarojs/components";

export default class WebviewComponent extends Component {
  constructor(props) {
    super(props);
  }

  config = {
    navigationBarTitleText: ""
  }

  render() {
    return <WebView src={this.$router.params.link} />;
  }
}
