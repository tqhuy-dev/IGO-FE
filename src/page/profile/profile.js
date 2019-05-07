import React ,  { Component } from 'react';
import Header from './../main/component/header/header';
import ContentList from '../main/component/content-list/content-list';
import ProfileContainer from './component/profile-container';
import '../profile/profile.css'
import { Link } from 'react-router-dom';
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
                     <div className="tab-detail-container">
                        <div className="tab-item">
                            <Link
                            to={{
                                pathname:"/friends"
                            }}>
                            Friends</Link>
                        </div>
                        <div className="tab-item">Content</div>
                        <div className="tab-item">Images</div>
                     </div>
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