import React, { Component } from 'react';
import './App.css';
import { Route , BrowserRouter ,  Switch , Link} from 'react-router-dom';
import AuthorizationComponent from '../src/page/auth/container/authorization';
import  MainPage  from '../src/page/main/container/main';
import LoginContainerComponent from '../src/page/auth/component/login-container/login-container';
import SigninComponent from '../src/page/auth/component/signin-container/signin-container';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <Switch>
          {/* <Route
            path="/auth"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/`} component={LoginContainer Component} exact />
                <Route path={`${url}/signin`} component={SigninComponent} />
              </>
            )}
          /> */}
          <Route path="/auth" component={AuthorizationComponent} />
          <Route path="/" component={MainPage} />
          {/* <Redirect /> */}
        </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
