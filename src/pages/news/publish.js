import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import { Input, Icon ,Button,Carousel,Col,Row,message,Modal} from 'antd';
import _mm from 'util/mm.js'
import Validate from 'util/validate';
import style from './index.scss';
import sb_img from 'images/wall/sb.png';


import Bread from 'components/global/bread';
import Btns from 'components/global/btns'
import config from 'base/config.json';
import api from 'api/news.js';

import TableList from 'components/global/tableList/index.js';
import Mbtn from 'components/global/button/index.js';
const confirm = Modal.confirm;
class Wall extends Component{
    constructor(props){
        super(props)
        this.Carousel = null ;
        this.breadList = [
            {
                name:'AR空中新闻',
                path:'/news/publish'
            },
            {
                name:'发布',
                path:''
            }
        ]
        this.state = {
            dataList:[]
        }
    }
    componentDidMount(){
        this.loadList()
    }
    loadList(){
        api.getNewsDetail({type:'1'}).then(res=>{
            this.setState({
                dataList:res.submit
            })
        }).catch(err=>{
            message.error(err)
        })
    }
    check(id,status,news_img,comment){
        let url = `/news/publish/detail?id=${id}&checked=3&img=${news_img}&comment=${comment}`,
            url_2 = `/news/publish/detail?id=${id}&img=${news_img}&comment=${comment}`
        url = status === '3000' ? url : url_2
        this.props.history.push(url)
    }
    update(id){
        this.props.history.push(`/news/auth/detail?id=${id}&checked=2`)
    }
    auth(id){
        this.props.history.push(`/news/auth/detail?id=${id}&checked=1`)
    }
    getBtns(status,id,news_img,comment){
        let btn ;
        let btn_1 = <div>
                        <Mbtn type='0' callback={()=>{this.check(id,status,news_img,comment)}}>查看</Mbtn>
                    </div>,
            btn_2 = <div>
                        <Mbtn type='0' callback={()=>{this.check(id,status,news_img,comment)}}>查看</Mbtn>
                        <Mbtn type='1' callback={()=>{this.clickDel(id)}}>删除</Mbtn>
                    </div>,
            btn_3 = <div>
                        <Mbtn type='0' callback={()=>{this.check(id,status,news_img,comment)}}>发布</Mbtn>
                        <Mbtn type='1' callback={()=>{this.clickDel(id)}}>删除</Mbtn>
                    </div>      
            if(status == '0000'){
                btn = btn_1
            }else if(status == '3000'){
                btn = btn_3
            }else{
                btn = btn_2
            }  
        return btn;
    } 
     //点击删除图标
     clickDel(id){
        confirm({
            title:'删除的内容无法恢复，确认删除？',
            onOk:()=>{
                api.delWall({news_id:id}).then(res=>{
                    this.loadList();
                }).catch(res=>{
                    message.error(res);
                })
            },
            okText:'确认',
            cancelText:'取消'
        })
    }    
    render(){
        let {dataList} = this.state;
        return (
            <div>
                <Bread breadList={this.breadList} />
                <TableList 
                    thead={[{width:'5%',name:' '},{width:'25%',name:'编辑人员'},{width:'20%',name:'编辑时间'},{width:'15%',name:'状态'},{width:'35%',name:'操作'}]}
                >
                        {
                            dataList.map((item,index)=>{
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.op_usr}</td>
                                        <td>{item.op_time}</td>
                                        <td style={{color:_mm.mapStatusToName(item.status).color}}>{_mm.mapStatusToName(item.status).name}</td>
                                        <td>{this.getBtns(item.status,item.news_id,item.news_img,item.comment)}</td>
                                    </tr>
                                )
                            })
                        }
                        {/* <tr>
                            <td>
                                <Mbtn type='2' callback={()=>{this.check()}}>hahah</Mbtn>
                                <Mbtn type='2' callback={()=>{this.check()}}>hahah</Mbtn>
                                <Mbtn type='2' callback={()=>{this.check()}}>hahah</Mbtn>
                            </td>
                        </tr> */}
                </TableList>
            </div>
            
        )
    }
}
export default withRouter(Wall);