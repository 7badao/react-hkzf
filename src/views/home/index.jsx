import React from 'react'
// 导入走马灯组件 Flex布局 Grid宫格
import { Carousel, Flex, Grid } from 'antd-mobile'
// 导入baseURL
import { BASEURL } from '../../utils/url'
// 导入路由
import { Link } from 'react-router-dom'
// 导入样式
import styles from './index.module.scss'
// 通过模块化的方式导入图片(本地图片加载必须通过这种方式)
import image1 from '../../assets/images/nav-1.png'
import image2 from '../../assets/images/nav-2.png'
import image3 from '../../assets/images/nav-3.png'
import image4 from '../../assets/images/nav-4.png'
// 导入搜索框子组件
import SearchHeader from "../../components/searchHeader";
// 导入获取本地存储城市
import { getCity } from "../../utils/city";
export default class Index extends React.Component {
  state = {
    swiper: null, // 轮播图
    imgHeight: 212,
    groups: null, // 租房数据
    news: null, // 新闻数据
    cityName:'深圳' // 城市名字数据
  }
  navs = [
    { icon: image1, text: '整租', path: '/layout/houseList' },
    { icon: image2, text: '合租', path: '/layout/houseList' },
    { icon: image3, text: '地图找房', path: '/map' },
    { icon: image4, text: '去出租', path: '/rent/add' }
  ]
  async componentDidMount() {
    const { label, value } = await getCity()
    this.setState({
      cityName:label
    })
    // 轮播图
    this.getSwipeData()
    // 租房小组
    this.getHouseData(value)
    // 新闻数据
    this.getNewsData(value)
  }
  // 发送轮播图请求
  getSwipeData = async () => {
    let results = await this.http.get('/home/swiper')
    // console.log(results.data)
    setTimeout(() => {
      this.setState({
        swiper: results.data.body
      })
    }, 100)
  }
  // 获取租房小组数据
  getHouseData = async value => {
    let results = await this.http.get(
      `/home/groups?area=${value}`
    )
    // console.log(results.data)
    this.setState({
      groups: results.data.body
    })
  }
  // 获取新闻数据
  getNewsData = async value => {
    let results = await this.http.get(
      `/home/news?area=${value}`
    )
    // console.log(results.data.body)
    // 数据更改
    this.setState({
      news: results.data.body
    })
  }
  // 轮播图
  renderSwipe = () => {
    return (
      <Carousel autoplay infinite>
        {/* 遍历轮播图数据 */}
        {this.state.swiper.map(item => (
          <a
            key={item.id}
            href="http://www.alipay.com"
            style={{
              display: 'inline-block',
              width: '100%',
              height: this.state.imgHeight
            }}
          >
            <img
              src={`${BASEURL}${item.imgSrc}`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'))
                this.setState({ imgHeight: 'auto' })
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }
  // 渲染导航数据
  renderNavBar = () => {
    return (
      <Flex className={styles.nav}>
        {/* 遍历导航数据 */}
        {this.navs.map(item => {
          return (
            <Flex.Item key={item.text}>
              {/* 声明式导航跳转 通过Link跳转 vue中通过$router跳转 */}
              <Link to={item.path}>
                <img src={item.icon} alt="" />
                <p>{item.text}</p>
              </Link>
            </Flex.Item>
          )
        })}
      </Flex>
    )
  }
  // 渲染租房小组
  renderHouseList = () => {
    return (
      <div className={styles.groups}>
        {/* 租房小组 更多 */}
        <Flex>
          <Flex.Item>
            <span className={styles.title}>租房小组</span>
          </Flex.Item>
          <Flex.Item align="end">
            <span>更多</span>
          </Flex.Item>
        </Flex>
        {/* 宫格 */}
        <Grid
          data={this.state.groups}
          hasLine={false}
          square={false}
          columnNum={2}
          renderItem={dataItem => {
            return (
              <div className={styles.navItem} key={dataItem.id}>
                <div className={styles.left}>
                  <p>{dataItem.title}</p>
                  <p>{dataItem.desc}</p>
                </div>
                <div className={styles.right}>
                  <img src={`${BASEURL}${dataItem.imgSrc}`} alt="" />
                </div>
              </div>
            )
          }}
        />
      </div>
    )
  }
  // 新闻数据
  renderNews = () => {
    return (
      <div className={styles.news}>
        <h3 className={styles.groupTitle}>最新资讯</h3>
        {/* 遍历数据 */}
        {this.state.news.map(item => {
          return (
            <div className={styles.newsItem} key={item.id}>
              <div className={styles.imgWrap}>
                <img
                  className={styles.img}
                  src={`${BASEURL}${item.imgSrc}`}
                  alt=""
                />
              </div>
              <Flex
                className={styles.content}
                direction="column"
                justify="between"
              >
                <h3 className={styles.title}>{item.title}</h3>
                <Flex justify="between" className={styles.info}>
                  <span>{item.from}</span>
                  <span>{item.date}</span>
                </Flex>
              </Flex>
            </div>
          )
        })}
      </div>
    )
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 搜索头部 */}
        <SearchHeader cityName={this.state.cityName}></SearchHeader>
        {this.state.swiper && this.renderSwipe()}
        {/* 导航数据 */}
        {this.renderNavBar()}
        {/* 租房小组数据 */}
        {this.state.groups && this.renderHouseList()}
        {/* 新闻数据 */}
        {this.state.news && this.renderNews()}
      </div>
    )
  }
}
