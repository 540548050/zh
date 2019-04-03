import React,{Component} from 'react';
import emitter from './eventEmitter.js';
class Test extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.emit = emitter.addListener('xixi',(msg,data)=>{
            console.log(msg);
            console.log(data)
        })
    }
    componentWillUnMount(){
        emitter.removeListener(this.emit)
    }
    render(){
        return (
            <div>test</div>
        )
    }
}
export default Test;