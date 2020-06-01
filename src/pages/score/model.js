import Taro from '@tarojs/taro';
import service from './service';
import mockData from '../../mock/index'

export default {
  namespace: 'score',
  state: {
    product_list: []
  },

  effects: {
    *getProduct(_, { call, put, select }) {
      yield put({
        type: 'save',
        payload: {
          product_list: mockData.productsByType
        }
      });
    },
  },

  reducers: {
    save(state, { payload: data }) {
      return { ...state, ...data };
    },
  },
};
