import React , {Component} from 'react';
import '../styles/authorization.css';
import { Route  , Switch } from 'react-router-dom'
import LoginContainerComponent from '../component/login-container/login-container';
import SigninComponent from '../component/signin-container/signin-container'
class AuthorizationComponent extends Component {

    render() {
        return(
                <div className="authorization-container">
                {/* <ul>
                    <li><Link to={{
                        pathname: this.props.match.url + ''
                    }}>Login</Link></li>
                    <li><Link to={{
                        pathname: this.props.match.url + '/signin'
                    }}>Signin</Link></li>
                </ul> */}
                <Switch>
                    <Route path="/auth/signin" component={SigninComponent} />
                    <Route path="/auth" component={LoginContainerComponent} />
                </Switch>
                </div>
        )
    }
}

export default AuthorizationComponent;