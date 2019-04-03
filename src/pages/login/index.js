import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import { Input, Icon ,Button} from 'antd';
import _mm from 'util/mm.js'
import Validate from 'util/validate';
import style from './index.scss';
import bg from 'images/login_img.jpg'
import logo from 'images/login_logo.png';
import api from 'api/login/index.js';
class Login extends Component{
    static getRedirect(){
        let res = window.location.hash.split('#')[2];
        return res;
    }
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            passWrod: '',
            verifyCode:'',
            redirect: '/',
            errorMsg:'',
            //获取验证码按钮是否可点击
            buttonIs:true,
            //获取验证码按钮文字
            buttonText:'获取验证码'
        }
    }
    // 当用户名发生改变
    handle(e){
        let inputValue  = e.target.value,
            inputName   = e.target.name;
        this.setState({
            [inputName] : inputValue
        });
    }
    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }
    // 当用户提交表单
    // onSubmit(){
    //     let msg = this.validate();
    //     if(msg){
    //         this.setState({
    //             errorMsg:msg
    //         })
    //     }else{
    //         loginApi.login({
    //             name:this.state.username,
    //             number:this.state.password,
    //             code:this.state.verifyCode
    //         }).then(res=>{
    //             console.log(res);
    //             // return;
    //             let token = res[0].token,
    //                 userInfo = res[0].userList;
    //             _mm.setStorage('token',token);
    //             _mm.setStorage('userInfo',userInfo);
    //             this.props.history.push(this.state.redirect)
    //         }).catch(res =>{
    //             this.setState({
    //                 errorMsg:res
    //             })
    //         })
    //     }
        
    // }
    //验证表单
    validate(){
        let validate = new Validate();
        validate.add(this.state.username,'notEmpty','用户名不能为空！');
        validate.add(this.state.password,'notEmpty','密码不能为空！');
        validate.add(this.state.verifyCode,'notEmpty','验证码不能为空！');
        let msg = validate.start();
        return msg;
    }
    onSubmit(){
        let {passWrod,userName} = this.state;
        api.login({account:userName,password:passWrod}).then(res=>{
            _mm.setStorage('userInfo',res);
            console.log(res)
            this.props.history.push('/')
        }).catch(err=>{
            this.setState({errorMsg:err})
        })
    }
    onKeyDown(e){
        let code = e.keyCode;
        if(code == 13){
            this.onSubmit()
        }
    }
    render(){
        let {userName,passWrod,errorMsg} = this.state;
        return(
            <div className={style.container} onKeyDown={(e)=>{this.onKeyDown(e)}}>
                <div className={style.lf}>
                    <img src={bg} alt=""/>
                </div>
                <div className={style.lr}>
                    <div className={style.logo}>
                        <img src={logo} alt=""/>
                        <div>智盒后台管理系统</div>
                    </div>
                    <div className={style.error}>{errorMsg}</div>
                    <div className={style.item}>
                        <Input
                            name = 'userName'
                            placeholder="账户名"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            value={userName}
                            onChange={e=>{this.handle(e)}}
                            ref={node => this.userNameInput = node}
                        />
                    </div>
                    <div className={style.item + ' ' + style.itemP}>
                        <Input
                            placeholder="密码"
                            name = 'passWrod'
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            value={passWrod}
                            type='password'
                            onChange={e=>{this.handle(e)}}
                            ref={node => this.userNameInput = node}
                        />
                    </div>
                    <div className={style.item + ' ' + style.itemP}>
                        <Button block={true} size='large' onClick={()=>{this.onSubmit()}} type="primary">登录</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);