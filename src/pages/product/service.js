import api from "../../services/api"

class Api {
  getMenu = data => {
    return api.get({ url: "/queryMenu", data })
  };

  getProduct = data => {
    return api.get({ url: "/queryProdcut", data })
  };

  getProductDetail = data => api.get({
    url: '/queryProdcutDetail',
    data
  })

  getNewProductDetail = data => api.get({
    url: '/queryNewProductDetail',
    data
  })

  getProductCollect = data => api.get({
    url: '/queryOneProductCollect',
    data
  })
}

export default new Api()
