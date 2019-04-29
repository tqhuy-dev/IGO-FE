import React ,  { Component } from 'react';
import Header from './../main/component/header/header';
import ContentList from '../main/component/content-list/content-list';
import ProfileContainer from './component/profile-container';
class Profile extends Component {
    render() {
        return(
            <div>
                <Header />
                <div className="content-body-container">
                    <ProfileContainer />
                    <br/>
                    <ContentList
                    dataType="profile"
                    />
                </div>

            </div>
        )
    }
}

export default Profile;