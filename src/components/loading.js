import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./loading.less";

export default function(props) {
  return (
    <View className="loading">
      <View className="loading-center">loading...</View>
    </View>
  );
}
