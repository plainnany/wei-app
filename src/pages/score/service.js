import api from "../../services/api";

class Api {
  getPresent = data => {
    return api.get({ url: "/queryPresent", data });
  };

  coinPresent = data => api.post({
    url: '/coinPresent',
    data
  })
}

export default new Api();
