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
    products: [],
    icons: [],
    swtich_brand_tab: ''
  },
  effects: {
    *load(_, { call, put }) {
      const { data } = yield call(homeApi.getBanner, {
        menu_id: PARAMS.banner,
        parent_id: 1,
        image_type: 1
      });
      yield put({ type: 'save', payload: { banner: data } })
    },
    *icons(_, { call, put }) {
      const { data } = yield call(homeApi.getBanner, {
        menu_id: PARAMS.icon,
        parent_id: 1,
        image_type: 2
      })
      yield put({
        type: 'save',
        payload: {
          icons: data,
        }
      })
    },
    *product(_, { call, put }) {
      const banner_response = yield call(homeApi.getBanner, {
        menu_id: PARAMS.new,
        parent_id: 2,
        image_type: 3
      })
      const banner_list = banner_response.data.sort((a, b) => a.parent_id - b.parent_id)

      const results = []
      for (let i = 0; i < banner_list.length; i++) {
        const res = yield call(homeApi.getNewProduct, {
          operator_mp: PARAMS.new,
          parent_id: banner_list[i].parent_id,
          image_type: 1
        })
        results.push({
          type: banner_list[i].describe_msg,
          banner: (banner_list[i] || {}).image_url,
          title: banner_list[i].describe_msg,
          imageList: res.data
        })
      }
      yield put({
        type: 'save',
        payload: { products: results }
      })
      return yield results
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
