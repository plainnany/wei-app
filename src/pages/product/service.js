import api from "../../services/api";

class Api {
  getMenu = data => {
    return api.get({ url: "/wx-intfice/queryMenu", data });
  };

  getProduct = data => {
    return api.get({ url: "/wx-intfice/queryFile", data });
  };
}

export default new Api();
