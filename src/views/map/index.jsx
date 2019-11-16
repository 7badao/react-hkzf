import React, { Component } from 'react'
// 导入样式
import styles from './index.module.scss'
import NavHeader from '../../components/navHeader'
// 导入antd的toast
import { Toast } from 'antd-mobile'
// 获取城市
import { getCity } from '../../utils/city'
const BMap = window.BMap
// 圆形覆盖物的样式：
const labelStyle = {
  cursor: 'pointer',
  border: '0px solid rgb(255, 0, 0)',
  padding: '0px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: 'rgb(255, 255, 255)',
  textAlign: 'center'
}
export default class index extends Component {
  async componentDidMount() {
    const { label, value } = await getCity()
    this.map = new BMap.Map('container')
    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      label,
      point => {
        if (point) {
          this.map.centerAndZoom(point, 11)
          // 添加覆盖物
          this.renderOverlays(value)
        }
      },
      label
    )
  }
  // 添加覆盖物(一级,二级,三级)
  renderOverlays = async id => {
    Toast.loading('拼命加载中...', 0)
    const result = await this.http.get(`/area/map?id=${id}`)
    Toast.hide()
    console.log(result)
    // 遍历生成得到的数据 渲染覆盖物
    result.data.body.forEach(item => {
      this.renderCircleOverlays(item)
    })
  }
  // 生成圆形的覆盖物(一级,二级)
  renderCircleOverlays = item => {
    const {
      coord: { longitude, latitude },
      count,
      label: name,
      value: id
    } = item
    const point = new BMap.Point(longitude, latitude)
    var opts = {
      position: point, // 指定文本标注所在的地理位置
      offset: new BMap.Size(30, -30) //设置文本偏移量
    }
    var label = new BMap.Label('', opts) // 创建文本标注对象
    // 写上覆盖物的内容
    label.setContent(`
     <div class=${styles.bubble}>
       <p class=${styles.name}>${name}</p>
       <p class=${styles.name}>${count}套</p>
     </div>  
   `)
    // 添加覆盖物的样式
    label.setStyle(labelStyle)
    this.map.addOverlay(label)
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
