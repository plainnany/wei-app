import Taro from '@tarojs/taro'
import dva from 'dva-core'
// import { createLogger } from 'redux-logger'
import createLoading from 'dva-loading'

console.log(dva)
let app
let store
let dispatch

function createApp(opt) {
  // redux日志
  // opt.onAction = [createLogger()]
  // app = create(opt)
  app = {}
  app.use(createLoading({}))

  // 适配支付宝小程序
  if (Taro.getEnv() === Taro.ENV_TYPE.ALIPAY) {
    global = {}
  }

  if (!global.registered) opt.models.forEach(model => app.model(model))
  global.registered = true
  app.start()

  store = app._store
  app.getStore = () => store

  dispatch = store.dispatch

  app.dispatch = dispatch
  return app
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch
  },
}
