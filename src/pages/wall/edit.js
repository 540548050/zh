import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import { Input, Icon ,Button,Carousel,Col,Row,message} from 'antd';
import _mm from 'util/mm.js'
import Validate from 'util/validate';
import style from './index.scss';
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

import Bread from 'components/global/bread';
import UploadBtn from 'components/global/uploadBtn';
import Btns from 'components/global/btns'
import config from 'base/config.json';
import api from 'api/wall.js'
class Wall extends Component{
    constructor(props){
        super(props)
        this.Carousel = null ;
        this.breadList = [
            {
                name:'AR展示墙',
                path:'/'
            },
            {
                name:'编辑',
                path:''
            }
        ]
        this.state = {
            readCount:'1000',
            todayCount:'100',
            slideActiveIndex:'0',
            imgUrl:'',
            time:'',
            scoreA:'',
            scoreB:'',
            exchange:[{name:'',ss:'',es:'',prize:'',count:''},{name:'',ss:'',es:'',prize:'',count:''},{name:'',ss:'',es:'10000000',prize:'',count:''}]
        }
    }
    componentDidMount(){
        api.getWallDetail({type:'1'}).then(res=>{
            let id,imgUrl;
                res.submit.forEach(item=>{
                    if(item.status === '0000'){
                        id = item.wall_id;
                    } 
                })
            return api.getDetailById({wall_id:id,imgUrl})
        }).then(res=>{
            let {balloon,prize,wall} = res;
            let {balloon_score,balloon_time} = balloon;
            this.setState({
                time:balloon_time,
                scoreA:balloon_score.split('.')[0],
                scoreB:balloon_score.split('.')[1],
                imgUrl:wall.wall_img,
                exchange:prize.map(item=>{
                    let obj = {};
                    obj.name = item.prize_name;
                    obj.prize = item.prize_daily_total;
                    obj.count = item.prize_totals;
                    obj.ss = item.prize_reward_odds.split('-')[0];
                    obj.es = item.prize_reward_odds.split('-')[1];
                    return obj;
                })
            })
        }).catch(err=>{
            message.error(err)
        })
    }
    changeImg(e){
        let index = e.target.getAttribute('data-key');
        this.Carousel.goTo(index,false);
        this.setState({
            slideActiveIndex:index
        })
    }
    onInput(e){
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name]:value
        })    
    }
    onExchange(e,index){
        let {exchange} = this.state;
        exchange[index][e.target.name] = e.target.value;
        this.setState({exchange})
    }
    submit(){
        let msg = this.validate();
        if(msg){
            message.error(msg)
        }else{
            this.addWall()
        }
    }
    addWall(){
        let {imgUrl,time,scoreA,scoreB,exchange} = this.state;
        api.addWall({
            wall:{
                wall_img:imgUrl
            },
            balloon:{
                balloon_score:scoreA+'.'+scoreB,
                balloon_time:time
            },
            prize:exchange.map(item=>{
                let obj = {};
                obj.prize_name = item.name;
                obj.prize_totals = item.count;
                obj.prize_daily_total = item.prize;
                obj.prize_reward_odds = item.ss + '-' + item.es;
                return obj;
            })
        }).then(res=>{
            message.success('编辑成功！')
            this.props.history.goBack();
        }).catch(err=>{
            message.error(err)
        })
    }
    validate(){
        let {imgUrl,time,scoreA,scoreB,exchange} = this.state;
        let validate = new Validate();
        validate.add(imgUrl,'notEmpty','AR 识别图不能为空！')
        validate.add(time,'isPositiveInteger','游戏时长必须为大于0的整数！')
        validate.add(scoreA,'isPositiveInteger','气球A积分必须为大于0的整数！')
        validate.add(scoreB,'isPositiveInteger','气球B积分必须为大于0的整数！')
        exchange.map(item=>{
            validate.add(item.name,'notEmpty','奖品名称不能为空！')
            validate.add(item.ss,'isPositiveInteger','开始积分必须为大于0的整数！')
            validate.add(item.es,'isPositiveInteger','结束积分必须为大于0的整数！')
            validate.add(item.prize,'notMinus','奖品/天只能为整数！')
            validate.add(item.count,'notMinus','奖品总量只能为整数！')
        })
        return validate.start();
    }
    render(){
        let {readCount,todayCount,slideActiveIndex,scoreA,scoreB,time,exchange,imgUrl} = this.state;
        return (
            <div>
                <Bread breadList={this.breadList} />
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
                        <div>
                            <span style={{color:'#E21918'}}>*</span>
                            <span>识别图要求：请上传图纹较为丰富，主图纹与背景对比度强烈的图作为识别图</span>
                        </div>
                    </div>
                    <div className={style.sbR + ' fl'}>
                        <div style={{marginTop:'98px'}}>
                            <UploadBtn callback={(res)=>{this.setState({imgUrl:res})}}/>
                        </div>
                    </div>
                </Item>
                <Item title='时长/积分设置'>
                    <Row>
                        <Col span={8}>
                            <Row>
                                <Col span={10}>游戏时长：</Col>
                                <Col span={7}><Input maxLength={3} name='time' value={time} onChange={(e)=>{this.onInput(e)}} addonAfter="秒"/></Col>
                            </Row>
                        </Col>
                        <Col span={14}>
                            <Row>
                               <Col span={6}>
                                    积分设置：
                               </Col>
                               <Col span={8}>
                                    <Row>
                                        <Col span={10}>气球A积分:</Col>
                                        <Col span={12}><Input maxLength={3} name='scoreA' value={scoreA} onChange={(e)=>{this.onInput(e)}} /></Col>
                                    </Row>
                               </Col>
                               <Col span={8}>
                                    <Row>
                                        <Col span={10}>气球B积分:</Col>
                                        <Col span={12}><Input maxLength={3} name='scoreB' value={scoreB} onChange={(e)=>{this.onInput(e)}}/></Col>
                                    </Row>
                               </Col>
                            </Row>
                        </Col>
                    </Row>
                </Item>
                <Item title="兑换设置">
                    <Row gutter={14} >
                        <Col span={3}>兑换设置：</Col>
                        <Col span={4}>
                            {
                                exchange.map((item,index)=>{
                                    return (
                                        <div key={index} style={{marginBottom:'10px'}}>
                                            <Row>
                                                <Col span={10}>奖品名称</Col>
                                                <Col span={14}><Input maxLength={10} name='name' value={item.name} onChange={(e)=>{this.onExchange(e,index)}} /></Col>
                                            </Row>
                                        </div>
                                    )
                                })
                            }
                        </Col>
                        <Col span={6}>
                            {
                                exchange.map((item,index)=>{
                                    return (
                                        <div key={index} style={{marginBottom:'10px'}}>
                                            <Row>
                                                <Col span={9}>兑换积分/分</Col>
                                                <Col span={15}>
                                                    <Row>
                                                        <Col span={11}><Input maxLength={7} name='ss' value={item.ss} onChange={(e)=>{this.onExchange(e,index)}}/></Col>
                                                        <Col span={2}>
                                                            <div style={{textAlign:'center'}}>-</div>
                                                        </Col>
                                                        <Col span={11}><Input maxLength={7} name='es' disabled={index == 2? true : false} value={item.es} onChange={(e)=>{this.onExchange(e,index)}}/></Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                })
                            }
                        </Col>
                        <Col span={4}>
                            {
                                exchange.map((item,index)=>{
                                    return (
                                        <div key={index} style={{marginBottom:'10px'}}>
                                            <Row>
                                                <Col span={10}>奖品/天</Col>
                                                <Col span={14}><Input name='prize' value={item.prize} onChange={(e)=>{this.onExchange(e,index)}}/></Col>
                                            </Row>
                                        </div>
                                    )
                                })
                            }
                        </Col>
                        <Col span={6}>
                            {
                                exchange.map((item,index)=>{
                                    return (
                                        <div key={index} style={{marginBottom:'10px'}}>
                                            <Row>
                                                <Col span={10}>奖品总量/个</Col>
                                                <Col span={10}><Input name='count' value={item.count} onChange={(e)=>{this.onExchange(e,index)}} /></Col>
                                            </Row>
                                        </div>
                                    )
                                })
                            }
                        </Col>
                    </Row>
                    <Btns callback={()=>{this.submit()}}/>
                </Item>       
            </div>
            
        )
    }
}
export default withRouter(Wall);