import React ,  { Component } from 'react';
import Header from './../main/component/header/header';
import ContentList from '../main/component/content-list/content-list';
class Profile extends Component {
    render() {
        return(
            <div>
                <Header />
                <ContentList
                dataType="profile"
                 />
            </div>
        )
    }
}

export default Profile;