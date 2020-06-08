import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./Modal.less";

/**
 * @param title {string|Node}
 * @param onOk {function}
 * @param onCancel {function}
 * @param content {string|Node}
 * @param visible {boolean}
 */

export default class Modal extends Component {
  render() {
    const { visible, title, content, onCancel, onOk } = this.props;
    if (!visible) {
      return <View> </View>;
    }
    return (
      <View className="wx-modal">
        <View className="wx-modal-container">
          <View className="wx-modal-title">{title}</View>
          <View className="wx-modal-content">{content}</View>
          <View className="wx-modal-footer">
            <Text className="wx-modal-cancel" onClick={onCancel}>
              取消
            </Text>
            <Text className="wx-modal-ok" onClick={onOk}>
              确定
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
