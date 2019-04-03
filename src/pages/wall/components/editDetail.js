import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import { Input, Icon ,Button,Carousel,Col,Row,message} from 'antd';
import _mm from 'util/mm.js'
import Validate from 'util/validate';
import style from '../index.scss';
import Chunk from 'components/global/chunk';
import Item from 'components/global/item';
import sb_img from 'images/wall/sb.png';
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
import api from 'api/wall.js'


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
        let {checked,id} = this.state;
        let fn = (res)=>{
            
            let {balloon,prize,wall} = res;
            let {balloon_score,balloon_time} = balloon;
            this.setState({
                time:balloon_time,
                scoreA:balloon_score.split('.')[0],
                scoreB:balloon_score.split('.')[1],
                imgUrl:wall.wall_img,
                comment:wall.comment,
                exchange:prize.map(item=>{
                    let obj = {};
                    obj.name = item.prize_name;
                    obj.prize = item.prize_daily_total;
                    obj.count = item.prize_totals;
                    obj.prize_reward_odds = item.prize_reward_odds;
                    return obj;
                })
            })
        }
        if(checked === null){
            api.getWallDetail({type:'1'}).then(res=>{
                let id;
                res.submit.forEach(item=>{
                    if(item.status === '0000') id = item.wall_id;
                })
                return api.getDetailById({wall_id:id})
            }).then(fn).catch(err=>{
                message.error(err)
            })
        }else{
            api.getDetailById({wall_id:id}).then(fn).catch(err=>{
                message.error(err)
            })
        }
        
    }
    changeImg(e){
        let index = e.target.getAttribute('data-key');
        this.Carousel.goTo(index,false);
        this.setState({
            slideActiveIndex:index
        })
    }
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
        api.updateWall({wall_id:id,status:updateStatus,comment:updateStatus==1?'':updateContent}).then(res=>{
            message.success('操作完成');
            this.props.history.goBack()
        }).catch(err=>{
            message.error(err)
        })
    }
    auth(){
        let {id,authStatus,authContent} = this.state;
        api.authWall({wall_id:id,status:authStatus,comment:authStatus==1?'':authContent}).then(res=>{
            message.success('操作完成');
            this.props.history.goBack()
        }).catch(err=>{
            message.error(err)
        })
    }
    publish(){
        let {id} = this.state;
        api.publish({wall_id:id,status:1}).then(res=>{
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
                    <div className={style.slideContainer} style={{width:'636px'}}>
                        <Carousel ref={(el)=>{this.Carousel = el}} afterChange = {(e)=>{this.setState({slideActiveIndex:e})}}>
                            <div>
                                <img  style={{width:'636px',height:'314px'}} src={s_img_1}/>
                            </div>
                            <div>
                                <img style={{width:'636px',height:'314px'}} src={s_img_2}/>
                            </div>
                            <div>
                                <img  style={{width:'636px',height:'314px'}} src={s_img_3}/>
                            </div>
                            <div >
                                <img  style={{width:'636px',height:'314px'}} src={s_img_4}/>
                            </div>
                            <div>
                                <img style={{width:'636px',height:'314px'}} src={s_img_5}/>
                            </div>
                        </Carousel>
                    </div>
                    <div onClick={(e)=>{this.changeImg(e)}} className={style.slideControl}>
                        <div className={slideActiveIndex == '0' ? style.active :''}>
                            <img data-key='0' style={{width:'114px',height:'56px'}} src={s_img_1}/>
                        </div>
                        <div className={slideActiveIndex == '1' ? style.active :''}>
                            <img data-key='1' style={{width:'114px',height:'56px'}} src={s_img_2}/>
                        </div>
                        <div className={slideActiveIndex == '2' ? style.active :''}>
                            <img data-key='2' style={{width:'114px',height:'56px'}} src={s_img_3}/>
                        </div>
                        <div className={slideActiveIndex == '3' ? style.active :''}>
                            <img data-key='3' style={{width:'114px',height:'56px'}} src={s_img_4}/>
                        </div>
                        <div className={slideActiveIndex == '4' ? style.active :''}>
                            <img data-key='4' style={{width:'114px',height:'56px'}} src={s_img_5}/>
                        </div>
                    </div>
                </Item>
                <Item title='AR 识别图'>
                    <div className='fl'>
                        <img style={{maxWidth:'384px',maxHeight:'560px'}} src={imgUrl?config.imgLib+'/'+imgUrl:sb_img}/>
                    </div>
                    <div className={style.sbR + ' fl'}>
                        <Button style={{marginTop:'98px'}} type='primary' href={imgUrl?config.imgLib+'/'+imgUrl:sb_img} target='_blank'>预览</Button>
                    </div>
                </Item>
                <Item title='游戏设置'>
                    <Row>
                        <Col span={24} xxl={12}>
                            <div className={style.yxF + ' clearfix'}>
                                <div className={style.yxFT}>
                                    <div className={style.score}>
                                        <div style={{backgroundColor:'#E94C2F'}}>气球红</div>
                                        <div>{scoreA}</div>
                                        <div>积分</div>
                                    </div>
                                    <div className={style.score}>
                                        <div style={{backgroundColor:'#F4A12F'}}>气球黄</div>
                                        <div>{scoreB}</div>
                                        <div>积分</div>
                                    </div>
                                    <div className={style.score}>
                                        <div style={{backgroundColor:'#3153B7'}}>游戏时长</div>
                                        <div>{time}</div>
                                        <div>S</div>
                                    </div>
                                </div>
                            </div>
                            <div style={{marginTop:'16px'}}>
                                <table className={style.yxTable}>
                                    <thead>
                                        <tr>
                                            <th>奖品名称</th>
                                            <th>兑换积分</th>
                                            <th>奖品/天</th>
                                            <th>奖品总量/份</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exchange.map((item,index)=>{
                                            return (
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>{item.prize_reward_odds}</td>
                                                    <td>{item.prize}</td>
                                                    <td>{item.count}</td>
                                                </tr>
                                            )
                                        })}
                                        
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                        <Col xxl={12}>
                            <div>
                                <Row>
                                    <Col span={8}>
                                        <div>
                                            <img src={yx_img_1} style={{width:'170px',height:'304px'}}/>
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <div>
                                            <img src={yx_img_2} style={{width:'170px',height:'304px'}}/>
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <div>
                                            <img src={yx_img_3} style={{width:'170px',height:'304px'}}/>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Item>
                {hasQRcode ?<QRcode/>:null }
                {
                    (checked =='0' && comment)?<Item title='备注'>
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