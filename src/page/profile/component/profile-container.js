import React, { Component } from 'react';
import svg from '../../../logo.svg';
import '../component/profile-container.css'
import { connect } from 'react-redux';
import axios from 'axios';
import { enviroment } from '../../../core/enviroment';
import { localStorageUserKey } from './../../../share/constant';
import { Modal, Button , Form, FormGroup} from 'react-bootstrap';
class ProfileContainer extends Component {

    constructor(props) {
        super(props);
        this.retrieveUserDetail();
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    state = {
        isShowModal: false
    }

    handleClose() {
        this.setState({ isShowModal: false });
    }
    
      handleShow() {
        this.setState({ isShowModal: true });
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
                <div className="btn-container"
                onClick={this.handleShow}
                >Edit</div>
                <Modal show={this.state.isShowModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <Form.Group controlId="firstname">
                                <Form.Control 
                                type="text"
                                placeholder="firstname"
                                />
                            </Form.Group>

                            <Form.Group controlId="lastname">
                                <Form.Control
                                type="text"
                                placeholder="lastname"
                                 />
                            </Form.Group>

                            <Form.Group controlId="phone">
                                <Form.Control
                                type="number"
                                placeholder="phone"
                                />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Control
                                type="password"
                                placeholder="password"
                                />
                            </Form.Group>

                            <Form.Group controlId="confirm-password">
                                <Form.Control
                                type="password"
                                placeholder="confirm password"
                                />
                            </Form.Group>
                            <div>Birthday</div>
                            <div className="form-birthday">
                                <Form.Group controlId="date">
                                    <Form.Control
                                    type="number"
                                    placeholder="date"
                                    />
                                </Form.Group>

                                <Form.Group controlId="month">
                                    <Form.Control
                                    type="number"
                                    placeholder="month"
                                    />
                                </Form.Group>

                                <Form.Group controlId="year">
                                    <Form.Control
                                    type="number"
                                    placeholder="year"
                                    />
                                </Form.Group>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                        Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                        Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
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