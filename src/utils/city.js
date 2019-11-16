//  导入axios
import { axios } from './axios'
import { Promise } from 'core-js'
// 定义一个KEY
const KEY = 'hkzf_city'
const BMap = window.BMap
// 将城市保存到本地
export const setLocationCity = city => {
  window.localStorage.setItem(KEY, JSON.stringify(city))
}
// 获取本地保持的城市
const getLocationCity = () => {
  return window.localStorage.getItem(KEY)
}
export const getCity = () => {
  // 获取本地保存的数据
  const city = getLocationCity()
  // 判断本地是否保存
  if (!city) {
    return new Promise((resolve, reject) => {
      //   console.log('本地没有')
      const myCity = new BMap.LocalCity()
      myCity.get(async results => {
        const res = await axios.get('/area/info', {
          params: {
            name: results.name
          }
        })
        // console.log(res)
        // 通过创建的promise的resolve方法传递出去
        resolve(res.data.body)
        // 保存到本地数据
        setLocationCity(res.data.body)
      })
    })
  } else {
    // 如果本地存在 存在则添加进去
    return Promise.resolve(JSON.parse(city))
  }
}
