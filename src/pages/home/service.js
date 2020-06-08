import api from "../../services/api";

class Api {
  getBanner = data => {
    return api.get({ url: "/queryLbFile", data });
  };

  getProduct = data => {
    return api.get({ url: "/queryFile", data });
  };
}

export default new Api();
