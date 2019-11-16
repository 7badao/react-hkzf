import React from 'react'
import styles from './index.module.scss'
import { NavBar } from 'antd-mobile'
// 导入pro-types
import PropTypes from 'prop-types'
// 导入高阶组件
import { withRouter } from 'react-router-dom'
// 创建函数式组件
function NavHeader({ children, history }) {
  return (
    <div className={styles.navBar}>
      <NavBar
        className={styles.navBar}
        mode="light"
        icon={<i className="iconfont icon-back" />}
        onLeftClick={() => history.goBack()}
      >
        {children}
      </NavBar>
    </div>
  )
}
// 类型约束
NavHeader.propTypes = {
  children: PropTypes.string.isRequired
}
// 导出函数式组件
export default withRouter(NavHeader)
