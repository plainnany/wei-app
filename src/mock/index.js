/**
 * mock data
 */

export const APP_ID = 'wx59a508fe793bbb3d'
export const SERVER = 'http://127.0.0.1:3000'
const IMAGE1 = '//p3.music.126.net/tVy3q61f3UTS48tGbpMxMA==/18920396090962168.jpg'
const IMAGE2 = '//p4.music.126.net/CGshVoj_5mDyYUWuRaI4tw==/18983068253749791.jpg'
const IMAGE3 = '//p4.music.126.net/fvwoBlqbNLQCDuxqen77NA==/18610333813666177.jpg'

const banners = [IMAGE1, IMAGE2, IMAGE3].map((v, i) => ({ name: '', image_url: v }))
const type = {
  新品: 'new',
  二次元: '',
  动漫: ''
}
const products = [{ type: 'new', name: '新品' },
{ type: 'ciyuan', name: '二次元' },
{ type: 'dongman', name: '动漫' },
{ type: 'carton', name: '卡通' },
{
  type: 'tv', name: '番剧'
}].map((v, i) => ({
  ...v,
  image_url: IMAGE2,
  alt: 'pic',
  title: v.name,
  id: i
}))

const productsByType = [0, 1, 2, 3, 4, 5, 6, 7].map((v, i) => ({
  image_url: IMAGE3,
  alt: 'pic',
  title: `test ${i}`,
  id: i,
  description: 'this is description'
}))

export default {
  banners,
  products,
  productsByType
}
