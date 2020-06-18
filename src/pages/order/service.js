import api from "../../services/api"

class Api {
  queryCoin = data => api.get({ url: "/queryCoin", data })
}

export default new Api()
