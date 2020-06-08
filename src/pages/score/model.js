import Taro from '@tarojs/taro';
import service from './service';
import mockData from '../../mock/index'

export default {
  namespace: 'score',
  state: {
    product_list: []
  },

  effects: {
    *getPresent(_, { call, put, select }) {
      const { data } = yield call(service.getPresent)
      yield put({
        type: 'save',
        payload: {
          product_list: data
        }
      });
    },
    *coinPresent({ payload }, { call, put, select }) {
      const { open_id, user_integral, addressList } = yield select(state => state.user)
      const data = yield call(service.coinPresent, {
        open_id: open_id,
        user_integral,
        present_id: payload.present_id,
        present_integral: payload.present_integral,
        coin_num: 1,
        ...addressList[0]
      })
      Taro.showToast({ title: '兑换成功' })
      return data
    }
  },

  reducers: {
    save(state, { payload: data }) {
      return { ...state, ...data };
    },
  },
};
