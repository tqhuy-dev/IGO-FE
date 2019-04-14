import React , {Component} from 'react';
import '../styles/authorization.css';
import Banner from '../component/banner/banner';
import { Route , Link , Switch } from 'react-router-dom'
import LoginContainerComponent from '../component/login-container/login-container';
import SigninComponent from '../component/signin-container/signin-container'
class AuthorizationComponent extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        // this.props.history.push('/login');
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