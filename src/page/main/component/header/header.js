import React ,{ Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../header/header.css';
class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header-container">
                <Form.Group controlId="finding-bar" className="header-input">
                    <Form.Control
                        type="text" 
                        placeholder="type your friend or location you want to know" 
                        onChange={(event) => this.handleInputChange(event , 'username')}/>
                </Form.Group>
                <div className="header-btn">
                    <div className="header-btn-item">Profile</div>
                    <div className="header-btn-item">Sign out</div>
                    <div className="header-btn-item">Setting</div>
                    <div className="header-btn-item">Filter</div>
                </div>
            </div>
        )
    }
}

export default Header;