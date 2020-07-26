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
    icons: []
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
      const powder = yield call(homeApi.getNewProduct, {
        operator_mp: PARAMS.new,
        parent_id: 1,
        image_type: 1
      })

      const powder_image = yield call(homeApi.getBanner, {
        menu_id: PARAMS.new,
        parent_id: 1,
        image_type: 3
      })

      const water = yield call(homeApi.getNewProduct, {
        operator_mp: PARAMS.new,
        parent_id: 2,
        image_type: 1
      })

      const water_image = yield call(homeApi.getBanner, {
        menu_id: PARAMS.new,
        parent_id: 2,
        image_type: 3
      })
      yield put({
        type: 'save',
        payload: {
          products: [{
            type: '粉末涂料新品',
            banner: (powder_image.data[0] || {}).image_url,
            title: '粉末涂料新品',
            imageList: powder.data
          },
          {
            type: '水性涂料新品',
            banner: (water_image.data[0] || {}).image_url,
            title: '水性涂料新品',
            imageList: water.data
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
