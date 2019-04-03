import React,{Component} from 'react';
import style from './index.scss';

class Chunk extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let {data,name,startColor,endColor} = this.props;
        return (
            <div className={style.box} style={{background:`linear-gradient(45deg,${startColor}, ${endColor})`}}>
                <div className={style.data}>{data}</div>
                <div className={style.name}>{name}</div>
            </div>
        )
    }
}
Chunk.defaultProps = {
    data:0,
    name:'',
    startColor:'#2E57B8',
    endColor:'#2DADD7'
}
export default Chunk;