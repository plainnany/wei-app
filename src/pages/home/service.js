import api from '../../services/api'

class Api {
  getBanner = data => {
    return api.get({ url: '/banner', data })
  }

  // getProduct = data => {
  //   return api.get({ url: '/product', data })
  // }

  getProduct = data => {
    return api.get({ url: '/wx-intfice/queryFile', data })
  }

}

export default new Api()
