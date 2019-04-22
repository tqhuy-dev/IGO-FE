import React ,{ Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import ButtonImg from './../../../../share/component/button-img/button-img';
import '../content-form/content-form.css';
class ContentForm extends Component {
    constructor(props) {
        super(props);
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
                        onChange={(event) => this.handleInputChange(event , 'username')}/>
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
                            <option>VietNam</option>
                            <option>Singapore</option>
                            <option>Korean</option>
                            <option>Japan</option>
                            <option>USA</option>
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
                    <div className="post-btn">Post</div>
                </div>
            </div>
        )
    }
}

export default ContentForm;