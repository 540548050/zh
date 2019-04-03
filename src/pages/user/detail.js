					
import React,{Component} from 'react';
import { Switch , Route,withRouter} from 'react-router-dom';
import {message,Row,Col,Input,Select} from 'antd';
import mm from 'util/mm.js';
import api from 'api/user.js';
import Bread from 'components/global/bread';
import style from './detail.scss';
import Btns from 'components/global/btns';
import Validate from 'util/validate/index.js'
const Option = Select.Option;
class UserDetail extends Component{
    constructor(props){
        super(props)
        this.breadList = [
            {
                name:'账户管理',
                path:'/news/detail'
            },
            {
                name:'添加/修改账户',
                path:''
            }
        ]
        this.state = {
           role:'2',
           accountName:'',
           email:'',
           admin:'',
           password:'',
           confirmPassword:'',
           id:mm.getParam('id'),
           checked : mm.getParam('id'),
           disabled:false
        }
    }
    componentDidMount(){
        let {checked} = this.state;
        if(checked !=null){
            this.setState({disabled:true})
            this.loadData()
        }
    }
    loadData(){
        let {id} = this.state;
        api.loadData({AID:id}).then(res=>{
            let {ACCOUNT,EMAIL,ROLE_ID,USERNAME} = res;
            this.setState({
                accountName:ACCOUNT,
                email:EMAIL,
                role:ROLE_ID+'',
                admin:USERNAME
            })
        }).catch(err=>{
            message.error(err)
        })
    }
    selectDataType(value){
        this.setState({role:value})
    }
    onInput(e){
        let name = e.target.name,
            value = e.target.value;
        this.setState({[name]:value})    
    }
    validate(){
        let {accountName,email,admin,password,confirmPassword} = this.state;
        let validate = new Validate();
        validate.add(accountName,'notEmpty','账户名不能为空！')
        validate.add(email,'isEmail','请输入正确的邮箱格式！')
        validate.add(admin,'notEmpty','管理员姓名不能为空！')
        validate.add(password,'notEmpty','初始密码不能为空！')
        validate.add(confirmPassword,'notEmpty','确认密码不能为空！')
        validate.add(password,`isSame:${confirmPassword}`,'两次输入的密码不同！')
        return validate.start();
    }
    submit(){
        let msg = this.validate();
        let {checked} = this.state;
        if(msg){
            message.error(msg)
        }else{
            if(checked !=null){
                this.updateUser();
            }else{
                this.addUser()
            }
        }
    }
    addUser(){
        let {accountName,email,role,admin,password} = this.state;
        let obj = {
            account:accountName,
            password,username:admin,
            email,role_id:role
        }
        api.addUser(obj).then(res=>{
            message.success('添加成功！')
            this.props.history.goBack()
        }).catch(err=>{
            message.error(err);
        })
    }
    updateUser(){
        let {id,password,admin,email} = this.state;
        api.updateUser({AID:id,password,username:admin,email}).then(res=>{
            message.success('修改账户成功!')
            this.props.history.goBack()
        }).catch(err=>{
            message.error(err)
        })
    }
    render(){
        // console.log(type)
        let {role,accountName,email,admin,password,disabled,confirmPassword} = this.state;
        return (
            <div>
                <Bread  breadList={this.breadList}/>
                <div className={style.detailBox} onChange={(e)=>{this.onInput(e)}} >
                    <div className={style.item}>
                        <Row align='bottom' >
                            <Col span={3}></Col>
                            <Col span={2}>账户选择:</Col>
                            <Col span={8}>
                                <Select
                                    disabled={disabled}
                                    showSearch
                                    style={{ width: '100%' }}
                                    optionFilterProp="children"
                                    value = {role}
                                    onChange={(value)=>{this.selectDataType(value)}}
                                >
                                    <Option value="2">系统管理员</Option>
                                    {/* <Option value="3">编辑账户（只有编辑权限）</Option> */}
                                </Select>
                            </Col>
                        </Row>
                    </div>
                    <div className={style.item}>
                        <Row align='bottom' >
                            <Col span={3}></Col>
                            <Col span={2}>账户名:</Col>
                            <Col span={8}>
                                <Input  disabled={disabled} name='accountName' value={accountName}  placeholder='请输入账户名称' />
                            </Col>
                        </Row>
                    </div>
                    <div className={style.item}>
                        <Row align='bottom' >
                            <Col span={3}></Col>
                            <Col span={2}>邮箱绑定:</Col>
                            <Col span={8}>
                                <Input name='email' value={email}  placeholder='请输入有效邮箱地址' />
                            </Col>
                        </Row>
                    </div>
                    <div className={style.item}>
                        <Row align='bottom' >
                            <Col span={3}></Col>
                            <Col span={2}>管理员:</Col>
                            <Col span={8}>
                                <Input name='admin' value={admin}  placeholder='请输入管理员姓名' />
                            </Col>
                        </Row>
                    </div>
                    <div className={style.item} >
                        <Row align='bottom' >
                            <Col span={3}></Col>
                            <Col span={2}>初始密码:</Col>
                            <Col span={8}>
                                <Input type='password' name='password' value={password}  placeholder='请输入初始密码' />
                            </Col>
                        </Row>
                    </div>
                    <div className={style.item} >
                        <Row align='bottom' >
                            <Col span={3}></Col>
                            <Col span={2}>确认密码:</Col>
                            <Col span={8}>
                                <Input type='password' name='confirmPassword' value={confirmPassword}  placeholder='请再次输入密码' />
                            </Col>
                        </Row>
                    </div>
                    <Btns callback={()=>{this.submit()}}/>
                </div>
            </div>
        )
    }

}
export default withRouter(UserDetail);