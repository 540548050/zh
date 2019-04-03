import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import Index from './index.js';
import Edit from './edit.js';
import Auth from './auth.js';
import AuthDetail from './authDetail.js';
import Publish from './publish.js';
import PublishDetail from './publishDetail.js';
class AuthRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Index}/>
                    <Route path='/wall/edit' component={Edit}/>
                    <Route exact path='/wall/auth' component={Auth}/>
                    <Route path='/wall/auth/detail' component={AuthDetail}/>
                    <Route exact path='/wall/publish' component={Publish}/>
                    <Route path='/wall/publish/detail' component={PublishDetail}/>
                </Switch>
            </div>
        )
    }
}
export default AuthRouter;