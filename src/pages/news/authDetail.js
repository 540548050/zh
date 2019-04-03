import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import { Input, Icon ,Button,Carousel,Col,Row} from 'antd';
import _mm from 'util/mm.js'
import style from './index.scss';
import Detail from './components/editDetail.js';
import Bread from 'components/global/bread';
class Wall extends Component{
    constructor(props){
        super(props)
        this.breadList = [
            {
                name:'AR空中新闻',
                path:'/news/auth'
            },
            {
                name:'审核',
                path:''
            }
        ]
        this.state = {}
    }
    render(){
        let {readCount,todayCount,slideActiveIndex} = this.state;
        return (
            <div>
                <Bread   breadList={this.breadList}/>
                <Detail/>      
            </div>
            
        )
    }
}
export default Wall;