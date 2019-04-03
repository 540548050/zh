					
import React,{Component} from 'react';
import { Switch , Route,withRouter} from 'react-router-dom';
import {message,Row,Col,Input,Button,Pagination,Modal} from 'antd';
import mm from 'util/mm.js';
import api from 'api/user.js';
import style from './detail.scss';
import TableList from 'components/global/tableList';
import Mbtn from 'components/global/button/index.js';
const confirm = Modal.confirm;
class UserDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            dataList:[],
            pageSize:10,
            pageNum:1,
            total:0
        }
    }
    componentDidMount(){
        this.loadList();
    }
    loadList(){
        let {pageSize,pageNum} = this.state;
        api.getUserList({
            currentPage:pageNum,
            pageSize
        }).then(res=>{
            console.log(res);
           this.setState({
                dataList:res.list,
                total:res.total
           })
        }).catch(err=>{
            message.error(err)
        })
    }
    changePage(page,pageSize){
        this.setState({
            pageNum:page
        },()=>{
            this.loadList();
        })
    }
    check(id){
        this.props.history.push(`/user/detail?id=${id}`)
    }
    //点击删除图标
    clickDel(id){
        console.log(id)
        confirm({
            title:'删除的内容无法恢复，确认删除？',
            onOk:()=>{
                api.delUser({AID:id}).then(res=>{
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
                <div>
                    <Button type='primary' onClick={()=>{this.props.history.push('/user/detail')}} size='large'>创建新账户</Button>
                </div>
                <TableList
                     thead={[{width:'15%',name:'账户名'},{width:'20%',name:'绑定邮箱'},{width:'15%',name:'管理员'},{width:'20%',name:'创建时间'},{width:'30%',name:'操作'}]}
                >
                    {
                        dataList.map((item,index)=>{
                            return (
                                <tr key={index}>
                                    <td>{item.ACCOUNT}</td>
                                    <td>{item.EMAIL}</td>
                                    <td>{item.USERNAME}</td>
                                    <td>{item.LOGIN_DATE}</td>
                                    <td>
                                        <div>
                                            <Mbtn type='4' callback={()=>{this.check(item.AID)}}>编辑</Mbtn>
                                            <Mbtn type='1' callback={()=>{this.clickDel(item.AID)}}>删除</Mbtn>
                                        </div>
                                    </td>
                                </tr>
                            )
                            
                        })
                    }
                </TableList>
                <div className='clearfix'>
                    <div className='fr'>
                        <Pagination onChange={(page,pageSize) =>{this.changePage(page,pageSize)}} hideOnSinglePage={true}
                        current={this.state.pageNum} pageSize={this.state.pageSize} defaultCurrent={1} 
                        total={this.state.total} />
                    </div>
                </div>
            </div>
        )
    }

}
export default withRouter(UserDetail);