import Taro from '@tarojs/taro';
import api from "../../services/api";

class Api {
  updateAddress = data => api.post({
    url: "/updateConsignee",
    data
  })
}

export default new Api();
