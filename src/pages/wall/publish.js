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
import api from 'api/wall.js';

import TableList from 'components/global/tableList/index.js';
import Mbtn from 'components/global/button/index.js';
const confirm = Modal.confirm;
class Wall extends Component{
    constructor(props){
        super(props)
        this.Carousel = null ;
        this.breadList = [
            {
                name:'AR展示墙',
                path:'/wall/publish'
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
        api.getWallDetail({type:'1'}).then(res=>{
            console.log(res)
            this.setState({
                dataList:res.submit
            })
        }).catch(err=>{
            message.error(err)
        })
    }
    check(id,status){
        let url = `/wall/publish/detail?id=${id}&checked=3`,
            url_2 = `/wall/publish/detail?id=${id}`
        url = status === '3000' ? url : url_2
        this.props.history.push(url)
    }
    update(id){
        this.props.history.push(`/wall/auth/detail?id=${id}&checked=2`)
    }
    auth(id){
        this.props.history.push(`/wall/auth/detail?id=${id}&checked=1`)
    }
    getBtns(status,id){
        let btn ;
        let btn_1 = <div>
                        <Mbtn type='0' callback={()=>{this.check(id,status)}}>查看</Mbtn>
                    </div>,
            btn_2 = <div>
                        <Mbtn type='0' callback={()=>{this.check(id,status)}}>查看</Mbtn>
                        <Mbtn type='1' callback={()=>{this.clickDel(id)}}>删除</Mbtn>
                    </div>,
            btn_3 =   <div>
                        <Mbtn type='0' callback={()=>{this.check(id,status)}}>发布</Mbtn>
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
                api.delWall({wall_id:id}).then(res=>{
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
                                        <td>{this.getBtns(item.status,item.wall_id)}</td>
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