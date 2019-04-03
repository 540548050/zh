import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import { Input, Icon ,Button,Carousel,Col,Row,message} from 'antd';
import _mm from 'util/mm.js'
import style from './index.scss';
import Chunk from 'components/global/chunk';
import Detail from './components/editDetail.js';
import Bread from 'components/global/bread';
import UploadBtn from 'components/global/uploadBtn';
import Btns from 'components/global/btns'
import config from 'base/config.json';
import api from 'api/news.js';
import Item from 'components/global/item';
import sb_img from 'images/news_img_arsbt.png';
import sb_img_2 from 'images/news_img_ys.png';
class Wall extends Component{
    constructor(props){
        super(props)
        this.breadList = [
            {
                name:'AR空中新闻',
                path:'/news'
            },
            {
                name:'编辑',
                path:''
            }
        ]
        this.state = {
            readCount:'1000',
            todayCount:'100',
            imgUrl:''
        }
    }
    componentDidMount(){
        this.loadList()
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
    submit(){
        let {imgUrl} = this.state;
        api.addNews({news_img:imgUrl}).then(res=>{
            message.success('编辑成功！');
            this.props.history.goBack()
        }).catch(err=>{
            message.error(err)
        })
    }
    render(){
        let {readCount,todayCount,slideActiveIndex,imgUrl} = this.state;
        return (
            <div>
                <Bread breadList={this.breadList} />
                <Item title='样式示意图'>
                    <img src={sb_img_2} width='238px' height='422px' />
                </Item>
                <Item title='AR 识别图'>
                    <div className='fl'>
                        <img style={{maxWidth:'384px',maxHeight:'560px'}} src={imgUrl?config.imgLib+'/'+imgUrl:sb_img}/>
                    </div>
                    <div className={style.sbR + ' fl'}>
                        <div style={{marginTop:'98px'}}>
                            <UploadBtn callback={(res)=>{this.setState({imgUrl:res})}}/>
                            {/* <UploadImg getUrl={(res)=>{this.setState({imgUrl:res})}}/> */}
                        </div>
                    </div>
                </Item>
                <Btns callback={()=>{this.submit()}}/>
            </div>
            
        )
    }
}
export default withRouter(Wall);