import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Index from './index.js';
import Detail from './detail.js';
class DataRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route exact path='/user'  component = {Index}/>
                    <Route path='/user/detail'  component = {Detail}/>
                </Switch>
            </div>
        )
    }
}
export default DataRouter;