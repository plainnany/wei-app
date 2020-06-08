import Taro, { Component } from "@tarojs/taro";
import { WebView } from "@tarojs/components";

export default class WebviewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const type = this.$router.params;
    setTimeout(() => {
      this.setState({
        type,
        url: "https://book.yunzhan365.com/kakp/llfm/mobile/index.html"
      });
    }, 100);
  }
  render() {
    return <WebView src={this.state.url} />;
  }
}
