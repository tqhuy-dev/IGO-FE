import React, { Component } from 'react';
import svg from '../../../logo.svg';
import '../component/profile-container.css'
import { connect } from 'react-redux';
import axios from 'axios';
import { enviroment } from '../../../core/enviroment';
import { localStorageUserKey } from './../../../share/constant';
class ProfileContainer extends Component {
    constructor(props) {
        super(props);
        this.retrieveUserDetail();
    }
    retrieveUserDetail() {
        let dataUser = JSON.parse(localStorage.getItem(localStorageUserKey));
        axios.get(enviroment + 'users/' + dataUser.data.username , {
            headers: {
                Authorization: 'Bearer ' + dataUser.token
            }
        })
        .then((result) =>{
            console.log(result);
        })
        .catch(error =>{
            console.log(error);
        })
    }
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

const mapStateToProps = state =>{
    return {
        userDetail: state.user.userDetail
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onHandleRetrieveUserDetail: (valueUser) => dispatch({
            type: 'GET_LIST_CONTENTS',
            value: valueUser    
        })
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(ProfileContainer)