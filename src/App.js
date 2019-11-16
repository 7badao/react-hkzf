import React from 'react';
import './App.css';
// 导入 react-router-dom
import { HashRouter as Router,Route,Switch,Redirect } from 'react-router-dom'
// 导入子组件
import Layout from './views/layout'
import Login from './views/login'
// 导入地图组件
import Map from './views/map'
// 导入城市搜索
import CityList from './views/cityList'
function NotRoute () {
  return <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573454653412&di=038bbffbad099ed90f5243ef97c9bd26&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01565959e6bcfda80121bea5beef4c.jpg%401280w_1l_2o_100sh.jpg"/>
}

function App() {
  return (
    <Router>
    <div id="app">
    <Switch>
      <Route path="/layout" component={Layout}/> 
      <Route path="/login" component={Login}/> 
      <Route path="/map" component={Map}/>
      <Route path="/cityList" component={CityList}/>
      {/* 路由重定向 */}
      <Redirect exact from="/" to="/layout"/>
      {/* 404 */}
      <Route component={NotRoute}/>
    </Switch>
    </div>
    </Router>
  );
}

export default App;
