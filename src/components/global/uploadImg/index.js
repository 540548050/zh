import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import {message,Modal,Button} from 'antd';
import commonApi from 'api/common.js';
import style from './index.scss';
// import uploadImg from 'images/zs2.png';
import _mm from 'util/mm.js';
import {connect} from 'react-redux';
// import Cropper from 'react-cropper';
import {SHOW_MODAL} from 'store/actionCreater.js';
//传入 getUrl 回调函数获取数据；
class UploadImg extends Component{
    constructor(props){
        super(props)
        this.state = {
            modalShow:false,
            imgBase64:'',
            initBase64:''
        }
    }
    
    render(){
        let {modalShow,imgBase64,initBase64} = this.state;
        return (
           <div>
                <div className={style.uploadDiv}>
                    <Button type='primary' onClick={(e)=>{this.props.showModal(e,(res)=>{this.props.getUrl(res,this.props.index)},this.props.aspectRatio)}}>替换</Button>
                    {/* <img onClick = {(e)=>{this.props.showModal(e,(res)=>{this.props.getUrl(res,this.props.index)},this.props.aspectRatio)}} src={this.props.imgUrl?this.props.imgUrl:this.props.defaultImgUrl} width={this.props.imgWidth} height={this.props.imgHeight}/> */}
                </div>
           </div>
                
        )
    }
}
UploadImg.defaultProps={
    imgWidth:328,
    imgHeight:140,
    index : 0,
    aspectRatio : 1334 / 750
}
const mapActionsToProps = (dispatch) =>{
    return {
        showModal:(e,fn,aspectRatio)=>{
            dispatch(SHOW_MODAL(fn,aspectRatio));
        }
    }
}
export default  connect(null,mapActionsToProps)(UploadImg);