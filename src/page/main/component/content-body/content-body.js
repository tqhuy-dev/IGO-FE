import React ,{ Component } from 'react';
import '../content-body/content-body.css';
import ContentForm from '../content-form/content-form';
import ContentList from './../content-list/content-list';
import { localStorageUserKey } from '../../../../share/constant';


class ContentBody extends Component {

    render() {
        let username = JSON.parse(localStorage.getItem(localStorageUserKey));
        return (
            <div className="content-body-container">
                <ContentForm />
                <br/>
                <ContentList
                username={username.data.username}
                dataType="home"
                 />
            </div>
        )
    }
}

export default ContentBody;