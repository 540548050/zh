import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link ,withRouter} from 'react-router-dom';
import style from  './index.scss';
// import menuCon from 'config/menuConfig.js';
// import mapPathToNav from './mapPathToNav.js';
import _mm from 'util/mm.js';
import logo from 'images/login_logo.png';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuTreeNode:[],
            openKeys:[],
            selectedKeys:['/data'],
            firstRender:true,
            //是否显示账户管理
            isAdmin:false
        }
    }
    componentDidMount(){
        let admin = _mm.getStorage('userInfo');
        admin && ( admin = JSON.parse(admin));
        let ACCOUNT = admin.ACCOUNT;
        if(ACCOUNT == '13709031300' || ACCOUNT=='admin01'){
            this.setState({isAdmin:true})
        }
        // let menuTreeNode = this.renderMenu(this.getMenuConfig());
        // this.setState({menuTreeNode});
        // this.getHash();
    }
    processKey(key){
        let keyList = key.split('/');
        // console.log(keyList)
        keyList.pop();
        let openKey = keyList.join('/');
        openKey = openKey ? openKey :'/'
        return openKey;
    }
    //菜单渲染
    renderMenu(menuCon){
        console.log(menuCon)
        return menuCon.map((item)=>{
            if(item.children){
                return (<SubMenu onTitleClick = {(e)=>{this.subClick(e)}}  key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>} >
                    {this.renderMenu(item.children)}
                </SubMenu>)
            }else{
                return (
                    <Menu.Item key={this.processKey(item.key)}>
                        <Link to={item.key}>
                        {
                            item.icon ? <span><Icon type={item.icon} />{item.title}</span> : item.title
                        }
                        </Link>
                    </Menu.Item>
                )
            }
        })
    }
    getMenuConfig(){
        let userInfo = _mm.getStorage('userInfo');
        console.log(userInfo)
        if(!userInfo){
            return menuCon;
        }else{
            let userInfo = JSON.parse(_mm.getStorage('userInfo'));
            let isAdmin = userInfo.isAdmin;
            let sjbPermissions = userInfo.sjbPermissions;
            let menuConfig  = isAdmin == 0 ? menuCon : sjbPermissions ;
            return menuConfig;
        }
    }
    subClick(e){
        let openKeys = e.key;
        this.setState({
            openKeys:[openKeys]
        })
    }
    changeBar(e){
        let openKeys = e.keyPath[1],
        nselectedKeys = e.keyPath[0];
        let hash = location.hash.substring(1);
        this.setState({
            openKeys:[openKeys],
            selectedKeys:[nselectedKeys]
        },()=>{
            hash!=nselectedKeys && this.props.history.push(nselectedKeys)
        })
    }
    getHash(){
        let setS = (keys)=>{
            this.setState({
                openKeys:keys[0],
                selectedKeys:keys[1]
            })
        }
        window.onhashchange = function(e){
            let hash = window.location.hash.substring(1);
            let key = mapPathToNav(hash);
            setS(key)
        }
        let hash = window.location.hash.substring(1);
        mapPathToNav(hash);
        let key = mapPathToNav(hash);
        setS(key)
    }
    render() {
        let {selectedKeys,openKeys,isAdmin} = this.state;
        return (
            <div className={style.navContainer}>
                <div className={style.logoBox}>
                    <img src={logo} />
                    <span>智盒后台管理系统</span>
                </div>
                <Menu
                    onClick={(e)=>{this.changeBar(e)}}
                    // defaultSelectedKeys={['1']}
                    // defaultOpenKeys={['sub1']}
                    openKeys = {openKeys}
                    selectedKeys = {selectedKeys}
                    style={{ width: 256 }}
                    mode="inline"
                    theme="dark"
                >
                    {/* <SubMenu onTitleClick = {(e)=>{this.subClick(e)}} key="/wall" title={<span><Icon type="picture" /><span>AR展示墙</span></span>}>
                        <Menu.Item key="/">编辑</Menu.Item>
                        <Menu.Item key="/wall/auth">审核</Menu.Item>
                        <Menu.Item key="/wall/publish">发布</Menu.Item>
                    </SubMenu>
                    <SubMenu onTitleClick = {(e)=>{this.subClick(e)}} key="/news" title={<span><Icon type="read" /><span>AR空中新闻</span></span>}>
                        <Menu.Item key="/news">编辑</Menu.Item>
                        <Menu.Item key="/news/auth">审核</Menu.Item>
                        <Menu.Item key="/news/publish">发布</Menu.Item>
                    </SubMenu> */}
                    <Menu.Item key="/data">
                        <Icon type="bar-chart" />
                        <span>数据看板</span>
                    </Menu.Item>
                    {
                        isAdmin ? <Menu.Item key="/user">
                            <Icon type="team" />
                            <span>账户管理</span>
                        </Menu.Item> :null
                    }
                </Menu>
            </div>
        );
    }
}
export default withRouter(Nav);