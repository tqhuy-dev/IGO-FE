import React ,{ Component } from 'react';
import { Form, Modal } from 'react-bootstrap';
import '../header/header.css';
import { Link } from 'react-router-dom';
import { localStorageUserKey } from './../../../../share/constant';
import axios from 'axios';
import { enviroment } from '../../../../core/enviroment';
class Header extends Component {

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.getDataCountry();
    }
    data = JSON.parse(localStorage.getItem(localStorageUserKey));
    signout() {
        localStorage.clear();
    }

    state = {
        isShowModal: false,
        country:[],
        city:[]
    }

    handleClose() {
        this.setState({ isShowModal: false });
    }

    handleShow() {
        this.setState({
            isShowModal: true
        })
    }

    getDataCountry() {
        const token = JSON.parse(localStorage.getItem('userStorage')).token;
        axios.get(enviroment + 'places/' , {headers : {
            Authorization: 'Bearer ' + token
        }})
        .then((data) =>{
            this.setState({
                country: data.data.data
            })
        })
        .catch((error) =>{
            this.props.onGetCity([]);
        })
    }

    render() {
        let cityDOM = this.state.city.length > 0 ? 
        (
            <Form.Group controlId="location">
                <Form.Control
                    as="select">
                    {this.state.location.map((element , index) =>{
                        return (
                            <option
                            key={index}
                            value={element.name}
                            >{element.name}</option>
                        )
                    })}
                </Form.Control>
            </Form.Group>
        ) : (
            <div></div>
        )
        return (
            <div className="header-container">
                <Form.Group controlId="finding-bar" className="header-input">
                    <Form.Control
                        type="text" 
                        placeholder="type your friend or location you want to know" 
                        onChange={(event) => this.handleInputChange(event , 'username')}/>
                </Form.Group>
                
                <div className="header-btn">
                    <div className="header-btn-item">
                        <Link
                        to={{
                            pathname: '/profile/' + this.data.data.username
                        }}
                        >Profile</Link>
                    </div>
                    <div className="header-btn-item">
                        <Link
                        to={{
                            pathname:"/"
                        }}>Home</Link>
                    </div>
                    <div className="header-btn-item">Setting</div>
                    <div className="header-btn-item" onClick={()=> this.handleShow()}>Filter</div>
                    <div className="header-btn-item">
                        <Link
                        onClick={this.signout.bind(this)} 
                        to={{
                            pathname: '/auth'
                        }}>
                        Sign out
                        </Link>
                    </div>
                </div>

                <div>
                    <Modal show={this.state.isShowModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Filter</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="city">
                                <Form.Control
                                    as="select">
                                    {this.state.country.map((element , index) =>{
                                    return (
                                        <option
                                        key={index}
                                        value={element.name}
                                        >{element.name}</option>
                                    )
                                    })}
                                </Form.Control>
                                {cityDOM}
                            </Form.Group>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Header;