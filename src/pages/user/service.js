import Taro from '@tarojs/taro';
import api from "../../services/api";

class Api {
  loginUser = data => api.post({
    url: "/loginUser",
    data
  })

  getUserInfo = data => api.get({
    url: '/queryUser',
    data
  })

  wxLogin = data => api.promisefy(Taro.login)(data)

  addScore = data => api.post({
    url: '/addUserIntegral',
    data
  })

  queryUser = data => api.get({
    url: '/queryUser',
    data
  })

  querySign = data => api.get({
    url: '/querySign',
    data
  })

}

export default new Api();
