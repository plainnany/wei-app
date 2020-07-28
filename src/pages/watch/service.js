import api from "../../services/api";

class Api {

  watchProduct = data => api.post({
    url: '/addProductCollect',
    data
  })

  getWatchedProduct = data => api.get({
    url: '/queryProductCollect',
    data
  })

}

export default new Api();
