import Taro from "@tarojs/taro";
import addressUpdateApi from "./service";

export default {
  namespace: "addressUpdate",
  state: {
    addressId: "",
    consignee_name: '',
    consignee_phone: '',
    consignee_address: ''
  },

  effects: {
    *getDistricts({ payload }, { put, call }) {
      const { status, data } = yield call(
        addressUpdateApi.getDistricts,
        payload
      );
      if (status === "ok") {
        const cities = data.send_cities.send_cities;
        const arr = [[], [], []];
        cities.forEach(item => {
          arr[0].push({
            key: item.key,
            name: item.name
          });
        });
        cities[0].cities.forEach(item => {
          arr[1].push({
            key: item.key,
            name: item.name
          });
        });
        cities[0].cities[0].regions.forEach(item => {
          arr[2].push({
            key: item.key,
            name: item.name
          });
        });
        yield put({
          type: "save",
          payload: {
            cities,
            districts: arr
          }
        });
      }
    },
    *submit({ payload }, { call, put, select }) {
      const { open_id } = yield select(state => state.user);
      const { data } = yield call(addressUpdateApi.updateAddress, {
        open_id,
        ...payload
      });
      if (data === 'ok') {
        Taro.showToast({
          title: '保存成功',
          icon: 'none'
        });
        yield put({
          type: 'user/save',
          payload: {
            addressList: [{ ...payload }],
          }
        })
        setTimeout(() => {
          Taro.navigateBack();
        }, 1000);
      } else {
        Taro.showToast({
          title: '保存失败',
          icon: 'none'
        })
      }
    },
    *removeAddress(_, { call, select }) {
      const { access_token } = yield select(state => state.common);
      const addressId = yield select(state => state.addressUpdate.addressId);
      const { status } = yield call(addressUpdateApi.removeAddress, {
        id: addressId,
        access_token
      });
      if (status === "ok") {
        Taro.showToast({
          title: "删除成功",
          icon: "none"
        });
        setTimeout(() => {
          Taro.navigateBack();
        }, 1000);
      }
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
