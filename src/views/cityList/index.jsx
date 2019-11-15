import React, { Component } from 'react'

export default class index extends Component {
  state = {
    cityList: null, // 左边城市对象
    cityIndex: null // 右边城市索引
  }
  componentDidMount() {
    this.getCityData()
  }
  // 获取城市数据
  getCityData = async () => {
    let results = await this.http.get('/area/city?level=1')
    console.log(results.data.body)
    // 定义一个空对象
    let cityList = {}
    // 遍历得到城市数据
    results.data.body.forEach(item => {
      // 截取城市的首字母 使用substring
      const firstCityName = item.short.substring(0, 1)
      // 归类 判断是否存在相同字母的数据
      if (cityList[firstCityName]) {
        // 如果对象存在相同的数据 添加到数组里面去
        cityList[firstCityName].push(item)
      } else {
        // 若不存在的话新增一条数据
        cityList[firstCityName] = [item]
      }
    })
    // 使用keys对首字母进行排序 在后面加个sort()
    let cityIndex = Object.keys(cityList).sort()
    // 请求热门城市
    const hotResult = await this.http.get('/area/hot')
    // 取出热门城市
    let hotCity = hotResult.data.body
    // 添加一个Hot索引 添加右边索引的最前面
    cityIndex.unshift('hot')
    // 处理左边城市对象 hot就是热门城市
    cityList['hot'] = hotCity
    console.log(cityList)
  }
  render() {
    return <div>城市搜索</div>
  }
}
