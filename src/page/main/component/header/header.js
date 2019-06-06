import React ,{ Component } from 'react';
import { Form, Modal } from 'react-bootstrap';
import '../header/header.css';
import { Link } from 'react-router-dom';
import { localStorageUserKey } from './../../../../share/constant';
import LocationClass from './../../../../share/business/LocationClass';
import { connect } from 'react-redux';
import Axios from 'axios';
import { enviroment } from '../../../../core/enviroment';
class Header extends Component {

    locationClass = new LocationClass();
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
        city:[],
        location:[],
        formFilter:{
            city:'',
            country:'',
            location:''
        }
    }

    handleClose() {
        this.setState({ isShowModal: false });
    }

    handleShow() {
        this.setState({
            isShowModal: true
        })
    }

    async getDataCountry() {
        let dataCountry = await this.locationClass.getDataCountry();
        this.setState({
        country: dataCountry
       })
    }

    async getDataCity(event) {
        let dataCityOfCountry = await this.locationClass.getDataCity(event.target.value);
        this.setState({
             city: dataCityOfCountry
         })
    }
    async getDataLocation(event) {
        let idCity = event.target.value;
        let dataLocation =await this.locationClass.getDataLocation(idCity);
        let formFilter = Object.assign({} , this.state.formFilter);
        let index = this.state.city.findIndex(o => o._id ===idCity);
        formFilter.city = this.state.city[index].name;
        this.setState({
            formFilter: formFilter
        });
        this.setState({
            location: dataLocation
        });
    }

    async submitFilter() {
        console.log(this.state.formFilter);
        Axios.get(enviroment + 'contents/filter/?' + 'city=' + this.state.formFilter.city , {
            headers:{
                Authorization: 'Bearer ' + this.data.token
            }
        })
        .then(val =>{
            console.log(val.data.data);
            this.props.onHandleRetrieveListContents(val.data.data);
        })
    }

    render() {
        let cityDOM = this.state.city.length > 0 ? 
        (
            <Form.Group controlId="location">
                <Form.Control
                    onChange={(event) => this.getDataLocation(event)}
                    as="select">
                    {this.state.city.map((element , index) =>{
                        return (
                            <option
                            key={index}
                            value={element._id}
                            >{element.name}</option>
                        )
                    })}
                </Form.Control>
            </Form.Group>
        ) : (
            <div></div>
        )

        let locationDOM = this.state.location.length > 0 ? 
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
                                    onChange={(event) => this.getDataCity(event)}
                                    as="select">
                                    {this.state.country.map((element , index) =>{
                                    return (
                                        <option
                                        key={index}
                                        value={element._id}
                                        >{element.name}</option>
                                    )
                                    })}
                                </Form.Control>
                            </Form.Group>
                            {cityDOM}
                            {locationDOM}
                            <div
                            onClick={() => this.submitFilter()} 
                            className="btn-submit-filter">
                            Filter
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        contents: state.form.listContent
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onHandleRetrieveListContents: (value) => dispatch({
            type: 'GET_LIST_CONTENTS',
            value: value
        })
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Header);