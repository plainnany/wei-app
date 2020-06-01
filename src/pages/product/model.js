import service from "./service";

export default {
  namespace: "product",
  state: {
    menu_list: [],
    product_list: []
  },
  effects: {
    *load({ payload }, { call, put }) {
      const { data } = yield call(service.getMenu);
      const menu_list = data.filter(v => v.child);
      yield put({ type: "save", payload: { menu_list } });
      return menu_list;
    },
    *getProduct({ payload }, { call, put }) {
      const { data } = yield call(service.getProduct, payload);
      yield put({ type: "save", payload: { product_list: data } });
      return data;
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
