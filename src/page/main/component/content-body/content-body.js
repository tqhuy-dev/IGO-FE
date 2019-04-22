import React ,{ Component } from 'react';
import '../content-body/content-body.css';
import ContentForm from '../content-form/content-form';
import ContentList from './../content-list/content-list';

import { createStore, combineReducers } from 'redux';
import CityReducer from '../content-form/store/city-reducer';
import contentFormReducer from './../content-form/store/content-form-reducer';
import { Provider } from 'react-redux';

const rootReducer = combineReducers({
    form: contentFormReducer,
    data: CityReducer
})
const store = createStore(rootReducer);
class ContentBody extends Component {

    render() {
        return (
            <div className="content-body-container">
                <Provider store={store}> <ContentForm /> </Provider>
                <ContentList />
            </div>
        )
    }
}

export default ContentBody;