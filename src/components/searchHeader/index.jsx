import React, { Component } from 'react'
// 导入props-type
import PropTypes from 'prop-types'
// 路由的高阶组件
import { withRouter } from 'react-router-dom'
// 导入样式
import styles from './index.module.scss'
// 导入flex
import { Flex } from 'antd-mobile'
function SearchHeader({ cityName, history }) {
  return (
    <div className={styles.root}>
      <Flex>
        <Flex className={styles.searchLeft}>
          {/* 左边城市 */}
          <div
            className={styles.location}
            onClick={() => history.push('/cityList')}
          >
            <span>{cityName}</span>
            <i className="iconfont icon-arrow"></i>
          </div>
          {/* 中间搜索 */}
          <div className={styles.searchForm}>
            <i className="iconfont icon-search"></i>
            <span>请输入小区或是地址</span>
          </div>
        </Flex>
        {/* 右边地图 */}
        {/* 点击地图跳转到地图页面 */}
        <i
          onClick={() => history.push('/map')}
          className="iconfont icon-map"
        ></i>
      </Flex>
    </div>
  )
}
// 类型校验
SearchHeader.propTypes = {
  cityName: PropTypes.string.isRequired
}
// 导入函数式组件
export default withRouter(SearchHeader)
