import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router,Route,Link,Switch,NavLink,Redirect} from 'react-router-dom';
// import 'font-awesome/css/font-awesome.min.css';
// import 'antd/dist/antd.less';
import 'common/reset.css';
import 'common/custom.scss';
import { Button } from 'antd';
import {Provider} from 'react-redux';
import store from 'store/store.js';
// page组件
// import Index from 'pages/index/index.js';
// import TenderRouter from 'pages/tender/router.js';
// import BidRouter from 'pages/bid/router.js';
import Login from 'pages/login';
import Layout from 'components/layout';
import Wall from 'pages/wall/router.js';
import News from 'pages/news/router.js';
import Data from 'pages/data/router.js';
import User from 'pages/user/router.js';

import Test from 'test/index.js';
// import Home  from 'pages/home/index.js';
// import FileDetail from 'components/global/fileDetail/fileDetail.js';
// //新闻管理
// import NewsRouter from 'pages/news/router.js';
// //系统管理
// import SystemRouter from 'pages/system/router.js';
// //服务管理
// import ServiceRouter from 'pages/service/router.js';
// //视频管理
// import VideoRouter from 'pages/video/router.js';
// //直播管理
// import LiveRouter from 'pages/live/router.js';
// //惠民购物
// import DiscountsRouter from 'pages/discounts/router.js';
// //投诉爆料
// import Issue from 'pages/issue/router.js';
// //搜索管理
// import SearchRouter from 'pages/search/router.js';
// //广告管理 
// import AdvertisingRouter from 'pages/advertising/router.js';
// //用户管理
// import UserRouter from 'pages/user/router.js';
// //裁剪img
import CropperImg from 'components/global/cropper/index.js';
class App extends Component{
	render(){
		let layoutRouter = (
			<Layout>
				<CropperImg/>
				<Switch>
					
					<Route path='/data' component = {Data} />
					<Route path='/user' component = {User} />
					{/* <Route path='/test' component={Test}/> */}
					<Route path='/' render={props=><Redirect to='/data'/>} />
					
					{/* <Redirect exact from='/news' to='/news/newsEdit' /> */}
				</Switch>
			</Layout>
		)
		return(
			<Provider store = {store}>
				<Router>
					<Switch>
						<Route path='/login' component={Login} />
						<Route path='/' render={(props) => layoutRouter }/>
					</Switch>
				</Router>
			</Provider>
		)
	}
}
ReactDOM.render(<App />,document.getElementById('app'))
