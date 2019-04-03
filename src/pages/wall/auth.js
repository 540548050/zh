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
                path:'/wall/auth'
            },
            {
                name:'审核',
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
        api.getWallDetail({type:'0'}).then(res=>{
            this.setState({
                dataList:res.verify
            })
        }).catch(err=>{
            message.error(err)
        })
    }
    check(id){
        this.props.history.push(`/wall/auth/detail?id=${id}&checked=0`)
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
                        <Mbtn type='0' callback={()=>{this.check(id)}}>查看</Mbtn>
                        <Mbtn type='1' callback={()=>{this.clickDel(id)}}>删除</Mbtn>
                        <Mbtn type='3' callback={()=>{this.update(id)}}>更新</Mbtn>
                    </div>,
            btn_2 = <div>
                        <Mbtn type='0' callback={()=>{this.check(id)}}>查看</Mbtn>
                        <Mbtn type='1' callback={()=>{this.clickDel(id)}}>删除</Mbtn>
                        <Mbtn type='2' callback={()=>{this.auth(id)}}>审核</Mbtn>
                    </div>,
            btn_3 = <div>
                        <Mbtn type='0' callback={()=>{this.check(id)}}>查看</Mbtn>
                        <Mbtn type='1' callback={()=>{this.clickDel(id)}}>删除</Mbtn>
                    </div>;
            if(status == '1000'){
                btn = btn_1
            }else if(status == '2000'){
                btn = btn_2
            }else{
                btn = btn_3
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
                                        <td style={{color:_mm.mapStatusToName(item.status).color}}>{
                                            _mm.mapStatusToName(item.status).name === '待更新' ?
                                            (<div>
                                                <div>{_mm.mapStatusToName(item.status).name}</div>
                                                <div style={{fontSize:'12px'}}>( 只有致和账户有更新权限 )</div>
                                            </div>):
                                            _mm.mapStatusToName(item.status).name
                                        }</td>
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