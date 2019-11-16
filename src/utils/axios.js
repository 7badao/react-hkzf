// 封装axios请求
// 导入react
import React, { Component } from 'react'
// 导入axios
import axios from 'axios'
// 导入配置的URL地址
import { BASEURL } from './url'
// 设置基地址
axios.defaults.baseURL = BASEURL
// 挂载到组件的原型上
Component.prototype.http = axios
export { axios }
