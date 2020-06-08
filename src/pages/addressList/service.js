import Taro from '@tarojs/taro';
import api from "../../services/api";

class Api {
  updateConsignee = data => api.post({
    url: "/updateConsignee",
    data
  })
}

export default new Api();
