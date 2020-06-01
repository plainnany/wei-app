/**
 * mock data
 */

export const APP_ID = 'wx59a508fe793bbb3d'
export const SERVER = 'http://127.0.0.1:3000'
const IMAGE1 = 'https://i.loli.net/2020/04/06/odKkuvrnPtTUlDw.jpg'
const IMAGE2 = 'https://i.loli.net/2020/04/06/rQIyBCMLRY8uPDa.jpg'
const IMAGE3 = 'https://i.loli.net/2020/04/06/8fUl3rbHoJcILCM.jpg'
const IMAGE4 = 'https://i.loli.net/2020/04/06/CulpvFsSIy5wtMj.jpg'

import Image1 from '../images/icon/gift.png'
import Image2 from '../images/icon/zhima.png'
import Image3 from '../images/icon/mayi.png'

const IMAGE_LIST = [Image1, Image1, Image1, Image1]

const PRODUCT2 = 'https://i.loli.net/2020/04/06/svtHfP3Xq7NAmUy.jpg'
const PRODUCT3 = 'https://i.loli.net/2020/04/06/kAS69qMnaXbPTxZ.jpg'


const banners = [IMAGE1, IMAGE2, IMAGE3].map((v, i) => ({ name: '', image_url: v }))

const products = [{ type: 'new', name: '新品' },
{ type: 'ciyuan', name: '涂料' },
{ type: 'dongman', name: '粉末' },
{ type: 'carton', name: '油漆' },
{ type: 'tv', name: '其他' }].map((v, i) => ({
  ...v,
  imageList: IMAGE_LIST,
  image_url: Image1,
  alt: 'pic',
  title: v.name,
  id: i
}))

const productsByType = [0, 1, 2, 3, 4, 5, 6, 7].map((v, i) => ({
  alt: 'pic',
  title: `标题`,
  image_url: (Math.random() * 10) > v ? IMAGE2 : IMAGE4,
  id: i,
  description: '描述信息'
}))

const productDetail = [PRODUCT2, PRODUCT3]

export default {
  banners,
  products,
  productsByType,
  productDetail
}
