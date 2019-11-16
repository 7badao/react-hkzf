import React, { Component } from 'react'
// 导入样式
import styles from './index.module.scss'
import NavHeader from '../../components/navHeader'
// 获取城市
import { getCity } from '../../utils/city'
const BMap = window.BMap
export default class index extends Component {
  async componentDidMount() {
    const { label } = await getCity()
    this.map = new BMap.Map('container')
    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(label,(point) => {
        if (point) {
          this.map.centerAndZoom(point, 11)
        }
      },
      label
    )
  }
  render() {
    return (
      <div className={styles.map}>
        <NavHeader>地图找房</NavHeader>
        <div id="container"></div>
      </div>
    )
  }
}
