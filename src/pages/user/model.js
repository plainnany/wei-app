import Taro from '@tarojs/taro';
import service from './service'

const USER_INFO = typeof Taro.getStorageSync('userInfo') === 'object' ? Taro.getStorageSync('userInfo') : {}
export default {
  namespace: 'user',
  state: {
    is_checked_in: null, // 是否签到
    nickName: '',
    avatarUrl: '',
    gender: '',
    province: '',
    city: '',
    code: Taro.getStorageSync('code'),
    open_id: Taro.getStorageSync('open_id'),
    session_key: Taro.getStorageSync('session_key'),
    ...USER_INFO,
    addressList: [],
    user_integral: '', // 用户积分
    user_login_num: '', // 用户现有积分
    user_phone: ''
  },

  subscriptions: {
    setup({ dispatch }) {
      Taro.checkSession({
        success: () => {
          console.log('checksession success')
          const session_key = Taro.getStorageSync('session_key')
          const code = Taro.getStorageSync('code')
          const open_id = Taro.getStorageSync('open_id')
          if (!session_key || !code || !open_id) {
            dispatch({ type: 'login' })
          }
        },
        fail: () => {
          console.log('checksession fail')
          dispatch({ type: 'login' })
        }
      })

    }
  },

  effects: {
    *login(_, { call, put }) {
      const data = yield call(service.wxLogin)
      yield put({
        type: 'save',
        payload: {
          code: data.code
        }
      })
    },
    *loginUser({ payload }, { call, put, select }) {
      const { code } = yield select(state => state.user)
      const response = yield call(service.loginUser, {
        code,
        userHead: payload.avatarUrl,
        userName: payload.nickName,
        userGender: payload.gender === 2 ? '女' : '男',
        userCity: payload.city,
        userProvince: payload.province
      })
      const signData = yield call(service.querySign, {
        open_id: response.open_id,
        forward_or_sign: 'Y'
      })
      yield put({
        type: 'save',
        payload: {
          open_id: response.open_id,
          session_key: response.session_key,
          is_checked_in: signData.data === 'Y',
          ...payload
        }
      })
      Taro.setStorageSync('session_key', response.session_key)
      Taro.setStorageSync('code', code)
      Taro.setStorageSync('userInfo', { ...payload })
      Taro.setStorageSync('open_id', response.open_id)
      return response
    },
    *queryUser({ payload }, { call, put, select }) {
      const { open_id } = yield select(state => state.user)
      const { data } = yield call(service.queryUser, { open_id })
      const user = data[0] || {}
      if (user.consignee_address && user.consignee_name && user.consignee_phone) {
        yield put({
          type: 'save',
          payload: {
            addressList: [{
              consignee_address: user.consignee_address,
              consignee_name: user.consignee_name,
              consignee_phone: user.consignee_phone,
            }],
            user_integral: user.user_integral,
            user_login_num: user.user_login_num
          }
        })
      }
    },
    *querySign(_, { call, put, select }) {
      const { open_id } = yield select(state => state.user)
      const { data } = yield call(service.querySign, {
        open_id,
        forward_or_sign: 'Y' // Y: 签到 N: 转发
      })
      yield put({
        type: 'save',
        payload: { is_checked_in: data === 'Y' }
      })
    },
    *getUserInfo({ payload }, { call, put, select }) {
      const { open_id } = yield select(state => state.user)
      const response = yield call(service.getUserInfo, { open_id })
      yield put({
        type: 'save',
        payload: {
          // open_id: response.open_id,
          // session_key: response.session_key
        }
      })
      // Taro.setStorageSync('access_token', res.session_key)
      // Taro.setStorageSync('open_id', res.open_id)
      return response
    },
    *checkin(_, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          is_checked_in: true
        }
      });
      Taro.showToast({
        title: `签到成功, 积分+5`,
        icon: "none"
      });
    },
    *addScore({ payload }, { call, put, select }) {
      const { open_id } = yield select(state => state.user)
      const response = yield call(service.addScore, {
        open_id,
        add_integral: payload.add_integral,
        forward_or_sign: payload.forward_or_sign // Y: 签到， N: 转发
      })
      const is_checked_in = response.sign_status === 'Y'
      if (response.data === 'ok') {
        const params = {
          user_integral: response.user_integral
        }
        if (payload.forward_or_sign === 'Y') {
          params.is_checked_in = is_checked_in
        }
        yield put({
          type: 'save',
          payload: params
        })
      }
      return response
    },
    *savePhoneNumber({ payload }, { call, put, select }) {
      const response = yield call(service.savePhoneNumber, payload)
      const user_phone = payload.encryptedData
      yield put({
        type: 'save',
        payload: { user_phone }
      })
      return yield response
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
