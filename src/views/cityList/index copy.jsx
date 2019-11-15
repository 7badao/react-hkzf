import React, { Component } from 'react'

export default class index extends Component {
  state = {
    cityObj: null, // 左边城市对象
    cityIndex: null // 右边城市索引
  }
  componentDidMount() {
    this.getCityData()
  }
  // 获取城市数据
  getCityData = async () => {
    let results = await this.http.get('/area/city?level=1')
    // console.log(results.data.body)
    // 定义一个空对象
    let cityList = {}
    // 遍历服务器返回的城市数据
    results.data.body.forEach(item => {
      // 截取城市简写的首字母 substring
      const filterNmae = item.short.substring(0, 1)
      // 判断该字符是否存在数据
      if (cityList[filterNmae]) {
        // 存在则push到数组
        cityList[filterNmae].push(item)
      } else {
        // 不存在则放到一个数组
        cityList[filterNmae] = [item]
      }
    //   console.log(cityList);
    })
    // 处理右边城市索引 按顺序排列 使用keys
    const cityIndex = Object.keys(cityList).sort()
    
    // 获取热门城市的数据
    const hotResult = await this.http.get('/area/hot')
    // 取出热门城市
    const hotCityList = hotResult.data.body
    console.log(hotCityList);
    // 给右边城市索引添加一个hot索引
    cityIndex.unshift('hot')
    // 处理左边对象 hot标签就是热门城市
    cityList['hot'] = hotCityList
    console.log(cityList,cityIndex);
    
  }
  render() {
    return <div>城市搜索</div>
  }
}
