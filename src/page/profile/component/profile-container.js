import React, { Component } from 'react';
import svg from '../../../logo.svg';
import '../component/profile-container.css'
import { connect } from 'react-redux';
import axios from 'axios';
import { enviroment } from '../../../core/enviroment';
import { localStorageUserKey, HASH_KEY } from './../../../share/constant';
import { Modal, Button , Form} from 'react-bootstrap';
import  DatePicker from 'react-datepicker';
import sha256 from 'sha256';
class ProfileContainer extends Component {

    constructor(props) {
        super(props);
        this.retrieveUserDetail();
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    state = {
        isShowModal: false,
        form:{
            firstName: '',
            lastName:'',
            phone: '',
            birthday: new Date(),
            password:'',
            confirmPassword: ''
        },
        isFriend: false
    }

    handleClose() {
        this.setState({ isShowModal: false });
    }
    
    handleShow() {
        this.setState({ isShowModal: true });
        let userDetail = {
            ...this.state.form
        }
        userDetail.firstName =  this.props.userDetail.firstName;
        userDetail.lastName = this.props.userDetail.lastName;
        userDetail.phone = this.props.userDetail.phone;
        userDetail.birthday = new Date(Number.parseInt(this.props.userDetail.birthday));
        this.setState({form:userDetail})
    }

    handleChangeValue(event , type) {
        let userDetail;
        if(type === 'firstName') {
            userDetail = {
                ...this.state.form,
                firstName:event.target.value
            }
        } else if(type === 'lastName') {
            userDetail = {
                ...this.state.form,
                lastName: event.target.value
            }
        } else if(type === 'phone') {
            userDetail = {
                ...this.state.form,
                phone: event.target.value
            }
        } else if(type === 'password') {
            userDetail = {
                ...this.state.form,
                password: event.target.value
            }
        } else if(type === 'confirmPassword') {
            userDetail = {
                ...this.state.form,
                confirmPassword: event.target.value
            }
        }
        this.setState({form:userDetail})
    }

    changeDatetime(date) {
        let userState = {
            ...this.state.form,
            birthday: date
        };
        this.setState({
            form: userState
        })
    }
    
    componentDidMount() {
        this.retrieveUserDetail();
        this.checkFriends();
        let dataUser = JSON.parse(localStorage.getItem(localStorageUserKey));
        if(this.props.username === dataUser.data.username) {
            this.setState({
                isFriend: true
            })
        }
    }

    retrieveUserDetail() {
        let dataUser = JSON.parse(localStorage.getItem(localStorageUserKey));
        axios.get(enviroment + 'users/' + this.props.username , {
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

    editUser() {
        let dataUser = JSON.parse(localStorage.getItem(localStorageUserKey));
        let body = {
            first_name: this.state.form.firstName !== this.props.userDetail.firstName ? this.state.form.firstName : '',
            last_name: this.state.form.lastName !== this.props.userDetail.lastName ? this.state.form.lastName : '',
            phone: this.state.form.phone !== this.props.userDetail.phone ? this.state.form.phone : '',
            birthday: new Date(this.state.form.birthday).toLocaleDateString('en-US') !== new Date(Number.parseInt(this.props.userDetail.birthday)).toLocaleDateString('en-US') 
            ? new Date(this.state.form.birthday).getTime().toString() : '',
            password: '',
            avatar:''
        };
        // if(this.state.form.password !== '' && this.state.form.password === this.state.form.confirmPassword) {
        //     body.password = this.state.form.password;
        // }else {
        //     alert('password not same');
        //     return;
        // }
        if(this.state.form.password !== '') {
            if(this.state.form.password === this.state.form.confirmPassword) {
                body.password = sha256(this.state.form.password + HASH_KEY);
            }else {
                alert('password not same');
                return ;
            }
        }
        axios.put(enviroment + 'users/' , body ,{
            headers:{
                Authorization: 'Bearer ' + dataUser.token
            }
        })
        .then((result) =>{
            this.retrieveUserDetail();
            this.handleClose();
        })

        .catch(error =>{
            console.log(error);
            this.handleClose();
        })
        this.handleClose();
    }

    checkFriends() {
        let dataStorage = JSON.parse(localStorage.getItem(localStorageUserKey));
        axios.get(enviroment + 'users/friends/' + dataStorage.data.username , {
            headers:{
                Authorization: 'bearer ' + dataStorage.token
            }
        })
        .then(result =>{
            let listFriends = [];
            listFriends = result.data.friends;
            if(listFriends.length !== 0) {
                let index = listFriends.findIndex(o => o.username === this.props.username);
                console.log(index);
                if(index !== -1) {
                    this.setState({
                        isFriend: true
                    })
                }
            }
        })
    }

    addFriend() {
        let token = JSON.parse(localStorage.getItem(localStorageUserKey)).token;
        axios.post(enviroment + 'users/friends' , {
            username:this.props.username
        },{
            headers:{
                Authorization: 'bearer ' +  token
            }
        })
        .then(result =>{
            alert(result.data.message);
            this.setState({
                isFriend: true
            })
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
                    <div
                    onClick={() => this.addFriend()}
                    hidden={this.state.isFriend}
                    className="information">Add Friend</div>
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
                                onChange={(event) => this.handleChangeValue(event , 'firstName')}
                                type="text"
                                placeholder="firstname"
                                defaultValue={this.state.form.firstName}
                                />
                            </Form.Group>

                            <Form.Group controlId="lastname">
                                <Form.Control
                                onChange={(event) => this.handleChangeValue(event , 'lastName')}
                                type="text"
                                placeholder="lastname"
                                defaultValue={this.state.form.lastName}
                                 />
                            </Form.Group>

                            <Form.Group controlId="phone">
                                <Form.Control
                                onChange={(event) => this.handleChangeValue(event , 'phone')}
                                type="number"
                                placeholder="phone"
                                defaultValue={this.state.form.phone}
                                />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Control
                                onChange={(event) => this.handleChangeValue(event , 'password')}
                                type="password"
                                placeholder="password"
                                />
                            </Form.Group>

                            <Form.Group controlId="confirm-password">
                                <Form.Control
                                onChange={(event) => this.handleChangeValue(event , 'confirmPassword')}
                                type="password"
                                placeholder="confirm password"
                                />
                            </Form.Group>

                            <DatePicker
                                 selected={this.state.form.birthday}
                                 onChange={this.changeDatetime.bind(this)}
                             />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                        Close
                        </Button>
                        <Button variant="primary" onClick={this.editUser.bind(this)}>
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