import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import {message,Modal,Button} from 'antd';
import commonApi from 'api/common.js';
import style from './index.scss';
// import uploadImg from 'images/zs2.png';
import _mm from 'util/mm.js';
//传入 getUrl 回调函数获取数据；
class UploadImg extends Component{
    constructor(props){
        super(props)
        this.state = {
            imgBase64:''
        }
    }
    upload(e){
        let _this = this;
        let file = e.target.files[0];
        let msg = _mm.checkFile(file,['jpg','jpeg','png','gif'],10);
        if(!msg.status){
            message.error(msg.message);
        }else{
            _mm.fileToBase64(file,(data)=>{
                // _this.setState({
                //     initBase64:data,
                //     imgBase64:data
                // })
                commonApi.uploadImg({
                    attachFilenames:data
                    }).then(res=>{
                        console.log(res)
                        this.props.callback(res);
                        // this.props.cancel();
                        // this.props.getUrl(res,this.props.index);
                        // this.setState({modalShow:false})
                    }).catch(err=>{
                        message.error(err);
                })
            });
        }
    }
    render(){
        return (
           <div>
               <div className={style.uploadDiv} >
                        <Button type='primary'>选择图片</Button>
                        <input type="file" onChange={(e)=>{this.upload(e)}}/>
                </div>
           </div>
                
        )
    }
}

export default  UploadImg;