import React ,{ Component } from 'react';
import { Form } from 'react-bootstrap';
import ButtonImg from './../../../../share/component/button-img/button-img';
import '../content-form/content-form.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { enviroment } from '../../../../core/enviroment';
const token = JSON.parse(localStorage.getItem('userStorage')).token;
const header = {
    Authorization: 'Bearer ' + token
}

class ContentForm extends Component {
    constructor(props) {
        super(props);
        this.getDataCountry();
    }

    async getDataCountry() {
        try {
            let dataCountry = await axios.get(enviroment + 'places/' , {headers: header})
            this.props.onGetCountry(dataCountry.data.data);

            let dataCity = await axios.get(enviroment + 'places/' + dataCountry.data.data[0]._id , {headers : header});
            this.props.onGetCity(dataCity.data.data);

            let dataLocation = await axios.get(enviroment + 'places/locations/' + dataCity.data.data[0]._id , {
                headers: header
            });
            this.props.onGetLocation(dataLocation.data.data);
            
        } catch (error) {
            console.log(error);
        }
    }

    getDataCity(event) {
        axios.get(enviroment + 'places/' + event.target.value , {headers : header})
        .then((data) =>{
            this.props.onGetCity(data.data.data);
        })
        .catch((error) =>{
            this.props.onGetCity([]);
        })
    }

    getDataLocation(event) {
        axios.get(enviroment + 'places/locations/' + event.target.value , {headers : header})
        .then((data) =>{
            this.props.onGetLocation(data.data.data);
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
                        type="text"
                        as="textarea"
                        rows="4" 
                        placeholder="type your content here" 
                        />
                </Form.Group>
                <div className="btn-container">
                    <ButtonImg
                    name="Images"
                    />

                    <ButtonImg
                    name="Friends"
                    />

                    <Form.Group controlId="exampleForm.ControlSelect1" className="margin-auto">
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

                    <Form.Group controlId="exampleForm.ControlSelect1" className="margin-auto">
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

                    <Form.Group controlId="exampleForm.ControlSelect1" className="margin-auto">
                        <Form.Control as="select">
                        {this.props.location.map((element , index) => {
                              return (
                                <option key={element._id}>{element.name}</option>
                              )
                          })}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1" className="margin-auto">
                        <Form.Control 
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
            value: event.target.key
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