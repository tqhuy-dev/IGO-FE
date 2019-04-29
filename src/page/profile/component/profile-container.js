import React, { Component } from 'react';
import svg from '../../../logo.svg';
import '../component/profile-container.css'
class ProfileContainer extends Component {
    render() {
        return (
            <div className="user-detail-container">
                <img src={svg} className="avatar-user"/>
                <div className="user-information-container">
                    <div className="information">Name:</div>
                    <div className="information">Email:</div>
                    <div className="information">Phone:</div>
                    <div className="information">Birthday:</div>
                </div>
                <div className="btn-container">Edit</div>
            </div>
        )
    }
}

export default ProfileContainer