import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import {Select,message} from 'antd';
import mm from 'util/mm.js';
import ReactEcharts from 'echarts-for-react';
import DataItem from 'components/global/dataItem/index.js';
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import api from 'api/data.js';
const Option = Select.Option;
class Read extends Component{
    constructor(props){
        super(props)
        this.state = {
            startTime:mm.getMonthByTime(Date.now()),
            xAxis:[],
            data:[],
            total:'',
            yearTotal:''
        }
    }
    componentDidMount(){
        this.loadData()
    }
    loadData(t){
        let {type} = this.props;
        type  = t !=null ? t : this.props.type;
        let {startTime} = this.state;
        api.getAppReg({time:startTime}).then(res=>{
            let xAxis = [];
            let data = res.date.map((item)=>{
                xAxis.push(item.time);
                let obj = {};
                obj.name = item.time;
                obj.value = item.count;
                return obj;
            })
            let total = data.reduce((total,item)=> total+item.value,0);
            this.setState({
                xAxis,data,total,yearTotal:res.total
            })
        }).catch(err=>{
            message.error(err)
        })
    }
    selectDataType(val){
        this.props.selectType(val)
    }
    selectTime(date,dateString){
        let time = dateString
        this.setState({
            startTime:time
        },()=>{
            this.loadData();
        })
    }
    confirmTime(){
        this.loadData();
    }
    componentWillReceiveProps (nextProps){
        if(nextProps.type == this.props.type){
            return false;
        }else{
            this.loadData(nextProps.type)
        }
    }
    render(){
        let {startTime,endTime,xAxis,data,total,yearTotal} = this.state;
        let rightBar = (
            <div style={{display:'inline-block'}}>
                <Select
                    showSearch
                    style={{ width: 150 }}
                    optionFilterProp="children"
                    value = {this.props.type}
                    onChange={(value)=>{this.selectDataType(value)}}
                >
                    <Option value="110001">成都博物馆</Option>
                    <Option value="110002">金沙博物馆</Option>
                </Select>
            </div>
        )
        var option = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}次",
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            yAxis:{
                type:'value'
            },
            xAxis :{
                type: 'category',
                data: xAxis
            },
            dataZoom:[
                {
                    type:'slider',
                    show:true,
                    start:0,
                    end:100
                }
            ],
            series : [
                {
                    name: '产品激活量',
                    type: 'bar',
                    barWidth: '40%',
                    data:data,
                    itemStyle: {
                        normal: {
                            color: '#6EADF4'
                        }
                    }
                }
            ]
        };
        return (
            <div>
                <DataItem   subTitle='app注册量统计' 
                    startTime = {startTime} endTime = {endTime} selectTime = {(e,v)=>{this.selectTime(e,v)}}
                    confirmTime = {()=>{this.confirmTime()}}
                >
                    <div>今年总量：{yearTotal}</div>
                    <div>本月总量：{total}</div>
                    <ReactEcharts
                        option={option}
                        notMerge={true}
                        lazyUpdate={true}
                        style={{height:'300px'}}
                        />
                </DataItem>
            </div>
        )
    }
}
// Read.defaultProps = {
//     type:'0'
// }
export default Read;