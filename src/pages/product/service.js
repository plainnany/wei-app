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
}

export default new Api()
