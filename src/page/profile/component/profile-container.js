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
    
    componentDidMount() {
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
            this.props.onHandleRetrieveUserDetail(result.data.data.user);
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
                    <div className="information">Name:{this.props.userDetail.firstName} {' '} {this.props.userDetail.lastName}</div>
                    <div className="information">Email:{this.props.userDetail.username}</div>
                    <div className="information">Phone:{this.props.userDetail.phone}</div>
                    <div className="information">Birthday:{new Date(Number.parseInt(this.props.userDetail.birthday)).toLocaleDateString('en-US')}</div>
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
            type: 'GET_USER',
            value: valueUser    
        })
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(ProfileContainer)