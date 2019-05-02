import React ,  { Component } from 'react';
import Header from './../main/component/header/header';
import ContentList from '../main/component/content-list/content-list';
import ProfileContainer from './component/profile-container';
class Profile extends Component {

    componentDidMount() {
    }
    render() {
        return(
            <div>
                <Header />
                <div className="content-body-container">
                    <ProfileContainer
                    username={this.props.match.params.username}
                     />
                    <br/>
                    <ContentList
                    username={this.props.match.params.username}
                    dataType="profile"
                    />
                </div>

            </div>
        )
    }
}

export default Profile;