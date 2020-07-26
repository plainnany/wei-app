import api from "../../services/api";

class Api {
  getBanner = data => {
    return api.get({ url: "/queryLbFile", data });
  };

  getMenu = data => {
    return api.get({ url: "/queryLbFile", data });
  }

  getProduct = data => {
    return api.get({ url: "/queryFile", data });
  };

  // 产品画册 
  getLink = data => {
    return api.get({ url: '/queryProdcut', data })
  }

  // 产品画册 
  getLinkDetail = data => {
    return api.get({ url: '/queryProdcutDetail', data })
  }

  getNewProduct = data => {
    return api.get({ url: '/queryNewProduct', data })
  }
}

export default new Api();
