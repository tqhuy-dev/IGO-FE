import React , {Component} from 'react';
import Header from '../component/header/header';
import ContentBody from '../component/content-body/content-body';
import contentFormReducer from '../component/content-form/store/content-form-reducer';
import CityReducer from '../component/content-form/store/city-reducer';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
const rootReducer = combineReducers({
    form: contentFormReducer,
    data: CityReducer
})
const store = createStore(rootReducer);
class MainPage extends Component {

    render() {
        return (
            <div>
                <Header />
                <Provider store={store}> <ContentBody /></Provider>
x            </div>
        )
    }
}

export default MainPage