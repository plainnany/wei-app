import homeApi from "./service";
import { PARAMS } from '../../config/index'

export default {
  namespace: "home",
  state: {
    banner: [],
    brands: [],
    products_list: [],
    new_product: [],
    page: 1,
    products: []
  },
  effects: {
    *load(_, { call, put }) {
      const { data } = yield call(homeApi.getBanner, { menu_id: PARAMS.banner });
      yield put({ type: 'save', payload: { banner: data } })
    },
    *product(_, { call, put }) {
      const { data } = yield call(homeApi.getBanner, { menu_id: PARAMS.new })
      yield put({
        type: 'save',
        payload: {
          products: [{
            type: '新品',
            title: '新品',
            imageList: data
          }]
        }
      })
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
