import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import contentFormReducer from './page/main/component/content-form/store/content-form-reducer';
import CityReducer from './page/main/component/content-form/store/city-reducer';
import userDetailReducer from './page/profile/store/user-detail-reducer';
import FriendStore from './page/list-friends/store/friend-reducer';
const rootReducer = combineReducers({
    form: contentFormReducer,
    data: CityReducer,
    user: userDetailReducer,
    friend: FriendStore
})
const store = createStore(rootReducer);
ReactDOM.render( <Provider store={store}> <App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
