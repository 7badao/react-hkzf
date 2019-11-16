import React, { Component } from 'react'
import { getCity, setLocationCity } from '../../utils/city'
// 导入antd
import { Toast } from 'antd-mobile'
// 导入navHeader
import NavHeader from '../../components/navHeader'
// 导入virtualized
import { AutoSizer, List } from 'react-virtualized'
// 导入样式
import styles from '../cityList/index.module.scss'

// 标题高度
const TITLE_HEIGHT = 36
const COUNT_HEIGHT = 50
// 有房源信息的城市
const CITIES = ['北京', '上海', '广州', '深圳']

export default class index extends Component {
  // 拿到dom节点
  listRef = React.createRef()
  state = {
    cityList: null, // 左边城市对象
    cityIndex: null, // 右边城市索引
    activeIndex: 0 // 右边默认选中的索引
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
    // 处理 左边城市对象 hot就是热门城市
    cityList['hot'] = hotCity
    // console.log(cityList)
    // 3.处理定位城市
    const locationgCity = await getCity()
    // console.log(locationgCity);

    // 给右边的索引添加一个#
    cityIndex.unshift('#')
    // #就是当前定位的城市
    cityList['#'] = [locationgCity]
    this.setState({
      cityList,
      cityIndex
    })
  }
  // 将字母改成大写的方法
  fileLatter = latter => {
    switch (latter) {
      case '#':
        return '定位城市'
      case 'hot':
        return '热门城市'
      default:
        return latter.toUpperCase()
    }
  }

  // 切换城市选择
  toggleCity = ({ label, value }) => {
    if (!CITIES.includes(label)) {
      Toast.info('该城市暂无房源哦~', 1)

      return
    }

    // 更新本地的定位城市
    setLocationCity({ label, value })

    // 返回
    this.props.history.goBack()
  }
  // 点击右边索引滚动到对应的位置
  clickCityIndex = index => {
    this.listRef.current.scrollToRow(index)
  }

  // rowRenderer 渲染左边每一行的数据
  rowRenderer = ({ key, index, style }) => {
    /* 获取每一行的标题 */
    let latter = this.state.cityIndex[index]
    // 获取每个标题下的数据
    let list = this.state.cityList[latter]
    // console.log(list);
    return (
      <div key={key} style={style} className={styles.city}>
        {/* 渲染每一行的标题 */}
        <div className={styles.title}>{this.fileLatter(latter)}</div>
        {/* 遍历标题下的城市 */}
        {list.map(item => {
          return (
            <div
              key={item.value}
              className={styles.name}
              onClick={() => this.toggleCity(item)}
            >
              {item.label}
            </div>
          )
        })}
      </div>
    )
  }

  // 渲染右边的索引
  renderCityIndex = () => {
    // 结构获取数据
    const { activeIndex, cityIndex } = this.state
    return (
      <div className={styles.cityIndex}>
        {/* 遍历右边的索引 */}
        {cityIndex.map((item, index) => {
          return (
            // 给右边的索引添加点击事件
            <div
              onClick={() => this.clickCityIndex(index)}
              className={styles.cityIndexItem}
              key={item}
            >
              <span className={index === activeIndex ? styles.indexActive : ''}>
                {item === 'hot' ? '热' : item.toUpperCase()}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  // 滚动时索引高亮
  onRowsRendered = ({ startIndex }) => {
    // console.log(startIndex)
    // 判断 如果滚动的下标不等于选中的下标才触发
    if (this.state.activeIndex !== startIndex) {
      this.setState({
        activeIndex: startIndex
      })
    }
  }

  // 计算每一行的高度
  calcRowHeight = ({ index }) => {
    // 获取索引的每一个字母
    let latter = this.state.cityIndex[index]
    // 获取每个字母下面的数据
    let list = this.state.cityList[latter]
    // 计算行高 标题+数组长度*每一个数据的高度
    return TITLE_HEIGHT + list.length * COUNT_HEIGHT
  }
  render() {
    return (
      <div className={styles.citylist}>
        <NavHeader>城市搜索</NavHeader>
        {/* 渲染左边城市数据列表 */}
        {this.state.cityList && (
          <AutoSizer>
            {({ height, width }) => (
              <List
                ref={this.listRef}
                height={height}
                rowCount={this.state.cityIndex.length}
                rowHeight={this.calcRowHeight}
                rowRenderer={this.rowRenderer}
                onRowsRendered={this.onRowsRendered}
                width={width}
                scrollToAlignment="start" // 滚动的时候，让其顶部对齐
              />
            )}
          </AutoSizer>
        )}
        {/* 渲染右边的索引 */}
        {this.state.cityIndex && this.renderCityIndex()}
      </div>
    )
  }
}
