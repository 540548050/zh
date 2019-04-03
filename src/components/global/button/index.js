import React,{Component} from 'react';
import style from './index.scss';

class Mbtn extends Component{
    constructor(props){
        super(props);
       
        this.typeMap = {
            '0':{
                color:'#F4A12F',
                name:'查看'
            },
            '1':{
                color:'#E21918',
                name:'删除'
            },
            '2':{
                color:'#000',
                name:'审核'
            },
            '3':{
                color:'#35BD78',
                name:'更新'
            },
            '4':{
                color:'#3490CD',
                name:'编辑'
            }
        }
    }
    render(){
        let {type} = this.props;
        let obj = this.typeMap[type];
        let style = {
            border:`1px solid ${obj.color}`,
            color:obj.color,
            width:'60px',
            height:'30px',
            lineHeight:'30px',
            borderRadius:'15px',
            textAlign:'center',
            fontSize:'14px',
            cursor:'pointer',
            display:'inline-block',
            marginRight:'15px'
        }
        return (
            <div onClick={()=>{this.props.callback()}} style={style} className={style.btn}>{this.props.children}</div>
        )
    }
}
Mbtn.defaultProps = {
    type:'0'
}
export default Mbtn;