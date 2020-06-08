import api from "../../services/api"

class Api {
  getMenu = data => {
    return api.get({ url: "/queryMenu", data })
  };

  getProduct = data => {
    return api.get({ url: "/queryFile", data })
  };
}

export default new Api()
