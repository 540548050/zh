import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import {message} from 'antd';
import Read from './components/read.js';
import AppReg from './components/appReg';
import AppView from './components/appView';
import DataItem from 'components/global/dataItem/index.js';
import TableList from 'components/global/tableList/index.js';
import mm from 'util/mm.js';
import api from 'api/data.js';
class Data extends Component{
    constructor(props){
        super(props)
        this.state = {
            type:'110001',
            wallStartTime:mm.getTimeByNumber(Date.now(),-10),
            wallEndTime:mm.getDateByTime(Date.now()),
            //展示墙数据
            data:{}
        }
    }
    //切换空中新闻、展示墙
    selectType(type){
        this.setState({type})
    }
    componentDidMount(){
        // this.loadWall();
    }
    //加载展示墙数据
    loadWall(){
        let {wallStartTime,wallEndTime} = this.state;
        api.getWallList({start_time:wallStartTime,end_time:wallEndTime}).then(res=>{
            this.setState({data:res})
        }).catch(err=>{
            message.error(err);
        })
    }
    //设置时间
    selectTime(date,dateString){
        let startTime = dateString[0],
            endTime = dateString[1];
        this.setState({
            wallStartTime:startTime,wallEndTime:endTime
        })
    }
    confirmTime(){
        this.loadWall();
    }
    render(){
        let {type,wallStartTime,wallEndTime,data} = this.state;
        // console.log(type)
        return (
            <div>
                <Read type={type} selectType={(type)=>{this.selectType(type)}} />
                <AppView/>
                <AppReg/>
               
            </div>
        )
    }

}
export default Data;