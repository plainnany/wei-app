import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index/index'
import models from './models/index'
// import dva from './utils/dva'
import { Provider } from '@tarojs/redux'

import './styles/base.less'

// const dvaApp = dva.createApp({
//   initialState: {},
//   models: models,
// })
// const store = dvaApp.getStore()
const store = {}

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  config = {
    pages: [
      'pages/index/index',
      'pages/product/index',
      'pages/user/index',
      'pages/login/index',
      'pages/productDetail/index',
    ],
    tabBar: {
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: './images/tab/home.png',
          selectedIconPath: './images/tab/home-active.png',
        },
        {
          pagePath: 'pages/product/index',
          text: '产品',
          iconPath: './images/tab/cart.png',
          selectedIconPath: './images/tab/cart-active.png',
        },
        {
          pagePath: 'pages/user/index',
          text: '我的',
          iconPath: './images/tab/user.png',
          selectedIconPath: './images/tab/user-active.png',
        },
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fafafa',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
