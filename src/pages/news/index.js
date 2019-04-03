import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import { Input, Icon ,Button,Carousel,Col,Row,message} from 'antd';
import _mm from 'util/mm.js'
import style from './index.scss';
import Chunk from 'components/global/chunk';
import api from 'api/news.js'
import Detail from './components/editDetail.js';

class Wall extends Component{
    constructor(props){
        super(props)
        this.Carousel = null ;
        this.state = {
            readCount:'',
            todayCount:''
        }
    }
    componentDidMount(){
        this.loadData()
    }
    loadData(){

        api.getBrowseData().then(res=>{
            let {month,day} = res;
            this.setState({
                readCount:month,todayCount:day
            })
        }).catch(err=>{
            message.error(err)
        })
    }
    render(){
        let {readCount,todayCount,slideActiveIndex} = this.state;
        return (
            <div>
                <div className='clearfix'>
                    <div className='clearfix fl'>
                        <div className='fl' style={{marginRight:'20px'}}>
                            <Chunk name='AR 空中新闻浏览总量' data={readCount} />
                        </div>
                        <div className='fl'>
                            <Chunk name='今日新增浏览量' data={todayCount} startColor='#E94426' endColor='#F5A91C' />
                        </div>
                    </div>
                    <div className='fr'>
                        <Button href='/#/news/edit' style={{marginTop:'55px',marginRight:'20px'}} type='primary'>编辑</Button>
                    </div>
                </div>
                <Detail/>      
            </div>
            
        )
    }
}
export default Wall;