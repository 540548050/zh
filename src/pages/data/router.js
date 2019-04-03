import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Index from './index.js';

class DataRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route exact path='/data'  component = {Index}/>
                </Switch>
            </div>
        )
    }
}
export default DataRouter;