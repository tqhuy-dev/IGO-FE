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
        this.getDataCity();
    }

    getDataCity() {
        axios.get(enviroment + 'places/' , {headers: header})
        .then((data) =>{
            this.props.onGetCountry(data.data.data);
        })
        .catch((error) =>{
            console.log(error);
            this.props.onGetCountry([]);
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
                <div className="btn-container">
                    <ButtonImg
                    name="Images"
                    />

                    <ButtonImg
                    name="Friends"
                    />

                    <Form.Group controlId="exampleForm.ControlSelect1" className="margin-auto">
                        <Form.Control as="select">
                            {this.props.country.map((element , index) => {
                                return (
                                    <option key={element._id}>{element.name}</option>
                                )
                            })}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1" className="margin-auto">
                        <Form.Control as="select">
                            <option>HCM City</option>
                            <option>Da Lat</option>
                            <option>Da Nang</option>
                            <option>Phu Quoc</option>
                            <option>Phan Rang</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1" className="margin-auto">
                        <Form.Control as="select">
                            <option>Thung Lung Tinh Yeu</option>
                            <option>Doi Mong Mo</option>
                            <option>Ho Xuan Huong</option>
                            <option>Langbiang</option>
                            <option>Thac Voi</option>
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
        country: state.data.country
    };
};

const mapDispatchToProps = dispatch =>{
    return {
        onHandleChangeContent: (event) => dispatch({
            type: 'TYPE_CONTENT',
            value: event.target.value
        }),

        onPostContent: () => dispatch({
            type: 'POST'
        }),

        onGetCountry: (value) => dispatch({
            type: 'GET_COUNTRY',
            value: value
        })
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(ContentForm);