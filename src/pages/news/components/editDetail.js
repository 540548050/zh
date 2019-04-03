import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import { Input, Icon ,Button,Carousel,Col,Row,message} from 'antd';
import _mm from 'util/mm.js'
import Validate from 'util/validate';
import style from '../index.scss';
import Chunk from 'components/global/chunk';
import Item from 'components/global/item';
import sb_img from 'images/news_img_arsbt.png';
import sb_img_2 from 'images/news_img_ys.png';
//轮播图
import s_img_1 from 'images/wall/zsq_img_ys_onebig.png';
import s_img_2 from 'images/wall/zsq_img_ys_twobig.png';
import s_img_3 from 'images/wall/zsq_img_ys_threebig.png';
import s_img_4 from 'images/wall/zsq_img_ys_fourbig.png';
import s_img_5 from 'images/wall/zsq_img_ys_fivebig.png';
//游戏图
import yx_img_1 from 'images/wall/zsq_img_dqqyx_one.png';
import yx_img_2 from 'images/wall/zsq_img_dqqyx_two.png';
import yx_img_3 from 'images/wall/zsq_img_dqqyx_three.png';
import config from 'base/config.json';
import api from 'api/news.js'


import Reply from 'components/global/reply';
import QRcode from 'components/global/QRcode';
import Btns from 'components/global/btns'
const TextArea = Input.TextArea;
class Wall extends Component{
    constructor(props){
        super(props)
        this.Carousel = null ;
        this.state = {
            checked:_mm.getParam('checked'),
            id:_mm.getParam('id'),
            slideActiveIndex:'0',
            imgUrl:'',
            time:'',
            scoreA:'',
            scoreB:'',
            exchange:[{name:'',prize_reward_odds:'',prize:'',count:''},{name:'',prize_reward_odds:'',prize:'',count:''},{name:'',prize_reward_odds:'',prize:'',count:''}],
            //审核状态
            authStatus:1,
            //审核内容
            authContent:'',
            //更新状态
            updateStatus:1,
            updateContent:'',
            //comment
            comment:''
        }
    }
    componentDidMount(){
        let img = _mm.getParam('img'),
            comment = _mm.getParam('comment') ? _mm.getParam('comment') :'';
        if(img){
            this.setState({imgUrl:img,comment})
        }else{
            this.loadList()
        }
    }
    loadList(){
        api.getNewsDetail({type:'1'}).then(res=>{
            let imgUrl;
            res.submit.forEach(item=>{
                if(item.status == '0000') imgUrl = item.news_img;
            })
            this.setState({imgUrl})
        }).catch(err=>{
            message.error(err)
        })
    }
    // changeImg(e){
    //     let index = e.target.getAttribute('data-key');
    //     this.Carousel.goTo(index,false);
    //     this.setState({
    //         slideActiveIndex:index
    //     })
    // }
    submit(){
        let {checked} = this.state;
        if(checked == 2){
            this.update()
        }else if(checked == 1){
            this.auth()
        }else if(checked ==3){
            this.publish()
        }
    }
    update(){
        let {id,updateStatus,updateContent} = this.state;
        api.updateWall({news_id:id,status:updateStatus,comment:updateStatus==1?'':updateContent}).then(res=>{
            message.success('操作完成');
            this.props.history.goBack()
        }).catch(err=>{
            message.error(err)
        })
    }
    auth(){
        let {id,authStatus,authContent} = this.state;
        api.authWall({news_id:id,status:authStatus,comment:authStatus==1?'':authContent}).then(res=>{
            message.success('操作完成');
            this.props.history.goBack()
        }).catch(err=>{
            message.error(err)
        })
    }
    publish(){
        let {id} = this.state;
        api.publish({news_id:id,status:1}).then(res=>{
            message.success('操作完成');
            this.props.history.goBack()
        }).catch(err=>{
            message.error(err)
        })
    }
    render(){
        let {readCount,todayCount,slideActiveIndex,imgUrl,time,scoreA,scoreB,exchange,
            authStatus,authContent,updateStatus,updateContent,checked,comment
        } = this.state;
        let hasBtn=true,hasQRcode=true,
            hasUpdate=true,hasAuth =false;
        if(checked==0 || checked==4 || checked == null) hasBtn=false;
        if(checked==4 || checked == null) hasQRcode =false;
        
        return (
            <div>
                <Item title='样式示意图'>
                    <img src={sb_img_2} width='238px' height='422px' />
                </Item>
                <Item title='AR 识别图'>
                    <div className='fl'>
                        <img style={{maxWidth:'384px',maxHeight:'560px'}} src={imgUrl?config.imgLib+'/'+imgUrl:sb_img}/>
                    </div>
                    <div className={style.sbR + ' fl'}>
                        <Button style={{marginTop:'98px'}} type='primary' href={imgUrl?config.imgLib+'/'+imgUrl:sb_img} target='_blank'>预览</Button>
                    </div>
                </Item>
                {hasQRcode ?<QRcode/>:null }
                {
                    (checked =='0' && comment) ?<Item title='备注'>
                            <TextArea rows={5} value={comment}  /> 
                    </Item> : null
                }
                {
                    checked == '1' ? <Reply getStatus = {(val)=>{this.setState({authStatus:val})}}
                    getDetail = {val=>{this.setState({authContent:val})}}
                    status = {authStatus} detail = {authContent}
                />:null
                }
                {
                    checked == '2' ? <Reply getStatus = {(val)=>{this.setState({updateStatus:val})}}
                    getDetail = {val=>{this.setState({updateContent:val})}}
                    status = {updateStatus} detail = {updateContent}
                    okText = '可更新'
                    noText = '不可更新'
                />:null
                }
                {hasBtn?<Btns okText={checked == '3'?'发布':'确定'} callback={()=>{this.submit()}}/>:null}
            </div>
            
        )
    }
}
export default withRouter(Wall);