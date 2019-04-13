import React, { Component } from 'react';
import './App.css';
import { Route , BrowserRouter} from 'react-router-dom';
import AuthorizationComponent from '../src/page/auth/container/authorization';
import  MainPage  from '../src/page/main/container/main';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/login" exact component={AuthorizationComponent} />
          <Route path="/" exact component={MainPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
