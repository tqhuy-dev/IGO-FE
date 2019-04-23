import React ,{ Component } from 'react';
import { Form } from 'react-bootstrap';
import ButtonImg from './../../../../share/component/button-img/button-img';
import '../content-form/content-form.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { enviroment } from '../../../../core/enviroment';

class ContentForm extends Component {
    constructor(props) {
        super(props);
        this.getDataCountry();
    }

    async getDataCountry() {
        try {
            const token = JSON.parse(localStorage.getItem('userStorage')).token;
            let dataCountry = await axios.get(enviroment + 'places/' , 
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            this.props.onGetCountry(dataCountry.data.data);

            let dataCity = await axios.get(enviroment + 'places/' + dataCountry.data.data[0]._id , {
                headers : {
                    Authorization: 'Bearer ' + token
                }
            });
            this.props.onGetCity(dataCity.data.data);

            let dataLocation = await axios.get(enviroment + 'places/locations/' + dataCity.data.data[0]._id , {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            this.props.onGetLocation(dataLocation.data.data);

            this.props.onHandleChangeCountry({
                country: dataCountry.data.data[0].name,
                name: dataCity.data.data[0].name,
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    getDataCity(event) {
        const token = JSON.parse(localStorage.getItem('userStorage')).token;
        axios.get(enviroment + 'places/' + event.target.value , {headers : {
            Authorization: 'Bearer ' + token
        }})
        .then((data) =>{
            this.props.onGetCity(data.data.data);
            this.props.onHandleChangeCountry({
                country: data.data.country.name,
                name:data.data.data[0].name
            })
        })
        .catch((error) =>{
            this.props.onGetCity([]);
        })
    }

    getDataLocation(event) {
        const token = JSON.parse(localStorage.getItem('userStorage')).token;
        axios.get(enviroment + 'places/locations/' + event.target.value , {headers : {
            Authorization: 'Bearer ' + token
        }})
        .then((data) =>{
            this.props.onGetLocation(data.data.data);
            this.props.oHandleChangeCity(data.data.city.name);
        })
        .catch((error) =>{
            this.props.onGetLocation([]);
        })
    }

    render() {
        return (
            <div className="form-container">
                <Form.Group controlId="formBasicEmail" className="margin-0">
                    <Form.Control
                        onChange={(event) => this.props.onHandleChangeContent(event)}
                        type="text"
                        as="textarea"
                        rows="4" 
                        placeholder="type your content here" 
                        />
                </Form.Group>
                <div className="location-tag">
                    <div className="location-item">TPHCM <span className="margin-auto close-tag">x</span></div>
                    <div className="location-item">TPHCM <span className="margin-auto close-tag">x</span></div>
                </div>
                <div className="btn-container">
                    <ButtonImg
                    name="Images"
                    />

                    <ButtonImg
                    name="Friends"
                    />

                    <Form.Group controlId="country" className="margin-auto">
                        <Form.Control
                        onChange={(event) => this.getDataCity(event)}
                        as="select">
                            {this.props.country.map((element , index) => {
                                return (
                                    <option
                                    value = {element._id} 
                                    key = {element._id}
                                    >{element.name}</option>
                                )
                            })}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="city" className="margin-auto">
                        <Form.Control
                        onChange={(event) => this.getDataLocation(event)}
                        as="select">
                          {this.props.city.map((element , index) => {
                              return (
                                <option
                                value = {element._id} 
                                key={element._id}>{element.name}</option>
                              )
                          })}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="location" className="margin-auto">
                        <Form.Control
                        onChange={(event) => this.props.onHandleChangeLocation(event)}
                        as="select">
                        {this.props.location.map((element  , index) => {
                              return (
                                <option 
                                key={element._id}
                                value={element.name}
                                >{element.name}</option>
                              )
                          })}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1" className="margin-auto">
                        <Form.Control
                        type="number"
                        onChange={(event) => this.props.onHandleChangePrice(event)}
                        placeholder="total price">
                        </Form.Control>
                    </Form.Group>
                </div>

                <div className="post-container">
                    <div 
                    className="post-btn"
                    onClick={this.props.onPostContent}
                    >Post</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        content: state.form.content,
        country: state.data.country,
        city: state.data.city,
        location: state.data.location
    };
};

const mapDispatchToProps = dispatch =>{
    return {
        onHandleChangeContent: (event) => dispatch({
            type: 'TYPE_CONTENT',
            value: event.target.value
        }),

        onHandleChangeCountry: (valueLocation) => dispatch({
            type: 'TYPE_COUNTRY',
            value: valueLocation
        }),

        oHandleChangeCity: (valueCity) => dispatch({
            type: 'TYPE_CITY',
            value: valueCity
        }),

        onHandleChangeLocation: (event) => dispatch({
            type: 'TYPE_LOCATION',
            value:event.target.value
        }),

        onHandleChangePrice: (event) => dispatch({
            type: 'TYPE_PRICE',
            value: event.target.value
        }),

        onPostContent: () => dispatch({
            type: 'POST'
        }),

        onGetCountry: (value) => dispatch({
            type: 'GET_COUNTRY',
            value: value
        }),

        onGetCity: (value) => dispatch({
            type: 'GET_CITY',
            value: value
        }),

        onGetLocation: (value) => dispatch({
            type: 'GET_LOCATION',
            value: value
        })
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(ContentForm);