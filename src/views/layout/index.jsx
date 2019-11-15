import React, { Component } from 'react'
// 导入react-router-dom
import { Route, Redirect, Switch } from 'react-router-dom'
// 按需导入导航栏组件
import { TabBar } from 'antd-mobile'
// 导入样式
import styles from './index.module.scss'
// 导入子组件
import Home from '../home'
import HouseList from '../houseList'
import Info from '../info'
import My from '../my'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: '/layout/home'
    }
  }
  // 列表数据
  navTable = [
    {
      title: '首页',
      icon: 'icon-index',
      path: '/layout/home'
    },
    {
      title: '找房',
      icon: 'icon-findHouse',
      path: '/layout/houseList'
    },
    {
      title: '资讯',
      icon: 'icon-info',
      path: '/layout/info'
    },
    {
      title: '我的',
      icon: 'icon-my',
      path: '/layout/my'
    }
  ]
  // 选中之后内容也要跟着改变,在componentDidUpdate钩子函数,数据更新之后
  componentDidUpdate(preveProps) {
    // console.log(preveProps)
    // 判断路由是否发生类变换 如果变了得到最新路由的内容
    if (preveProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        selectedTab: this.props.location.pathname
      })
    }
  }
  // 生成导航数据的方法
  renderTabBar = () => {
    return (
      <TabBar tintColor="#21B97A">
        {/* 遍历数据数组 */}
        {this.navTable.map(item => {
          return (
            <TabBar.Item
              title={item.title}
              key={item.path}
              icon={<i className={`iconfont ${item.icon}`} />}
              selectedIcon={<i className={`iconfont ${item.icon}`} />}
              selected={this.state.selectedTab === item.path}
              onPress={() => {
                // this.setState({
                //   selectedTab: item.path
                // })
                // 如果内容发生跳转 跳转到最新的路由
                if (this.setState.selectedTab === item.path) return
                // 编程式导航跳转
                this.props.history.push(item.path)
              }}
            ></TabBar.Item>
          )
        })}
      </TabBar>
    )
  }
  render() {
    return (
      <div className={styles.layout}>
        <Switch>
          <Route path="/layout/home" component={Home} />
          <Route path="/layout/houseList" component={HouseList} />
          <Route path="/layout/info" component={Info} />
          <Route path="/layout/my" component={My} />
          <Redirect from="/layout" to="/layout/home" />
        </Switch>
        {/* 下方导航 */}
        <div className={styles.tabbar}>{this.renderTabBar()}</div>
      </div>
    )
  }
}
