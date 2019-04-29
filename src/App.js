import React, { Component } from 'react';
import './App.css';
import { Route , BrowserRouter ,  Switch } from 'react-router-dom';
import AuthorizationComponent from '../src/page/auth/container/authorization';
import  MainPage  from '../src/page/main/container/main';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import Profile from './page/profile/profile';

library.add(faStroopwafel)
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
          <Route path="/profile" component={Profile} />
          <Route path="/" component={MainPage} />
          {/* <Redirect /> */}
        </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
