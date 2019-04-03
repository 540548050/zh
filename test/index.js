import React,{Component} from 'react';
import Child from './test.js';
import style from './index.scss';
import emitter from './eventEmitter.js';
class Test extends Component{
    constructor(props){
        super(props)
        this.state = {
            flag:true
        }
    }
    componentDidMount(){
       
    }
    click(){
        emitter.emit('xixi','hhhhhh')
    }
    render(){
        return (
            <div className={style.cc}>
                <Child/>
                <button onClick={()=>this.click()}>点击</button>
            </div>
        )
    }
}
export default Test;