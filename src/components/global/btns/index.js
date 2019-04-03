import React,{Component} from 'react';
// import style from './index.scss';
import {Button} from 'antd';
import {withRouter} from 'react-router-dom';
class Btns extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let {data,name,startColor,endColor,okText} = this.props;
        return (
            <div className='btns' style={{textAlign:'center',marginTop:'20px'}}>
                <Button onClick={()=>{this.props.callback()}} style={{marginRight:'30px'}} type='primary'>{okText}</Button>
                <Button onClick={()=>{this.props.history.goBack()}}>取消</Button>
            </div>
        )
    }
}
Btns.defaultProps = {
    okText:'确定'
}
// Btns.defaultProps = {
//     data:0,
//     name:'',
//     startColor:'#2E57B8',
//     endColor:'#2DADD7'
// }
export default withRouter(Btns);