import React,{Component} from 'react';
import { Card ,Select,DatePicker} from 'antd'
import mm from 'util/mm.js';
import style from './index.scss';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const {MonthPicker} = DatePicker;
const Option = Select.Option;
class Item extends Component{
    constructor(props){
        super(props)
        this.state={
            startTime:mm.getDateByTime(Date.now()),
            format:'YYYY-MM'
        }
    }
    selectTime(date,dateString){
        this.props.selectTime(date,dateString)
    }
    //点击确认后的回调
    confirmTime(data,dateString){
        this.props.confirmTime()
    }
    render(){
        let {title,subTitle,startTime} = this.props;
        let {format} = this.state;
        return (
            <div className={style.box}>
                <div className={style.head + ' clearfix'}>
                    <div className={style.title}>{title}</div>
                    <div className={style.subTitle}>{subTitle}</div>
                    <div className={style.right + ' clearfix'}>
                        <div className={style.time}>
                            <MonthPicker  allowClear= {false}
                                onChange = {(date,dateString)=>{this.selectTime(date,dateString)}}
                                onOk = {(data,dateString)=>{this.confirmTime(data,dateString)}} 
                                format={format}
                                value = {moment(`${startTime}`, format)}
                                />
                        </div>
                        <div className='fl'>
                            {this.props.rightBar}
                        </div>
                    </div>
                </div>
                <div className={style.body+' clearfix'}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
Item.defaultProps = {
    title:'',
    subTitle:'',
    startTime:'',
    endTime:''
}
export default Item;