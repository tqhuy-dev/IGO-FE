import React ,{ Component } from 'react';
import { Form } from 'react-bootstrap';
import '../header/header.css';
import { Link } from 'react-router-dom';
import { localStorageUserKey } from './../../../../share/constant';
class Header extends Component {

    data = JSON.parse(localStorage.getItem(localStorageUserKey));
    signout() {
        localStorage.clear();
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
                    <div className="header-btn-item">Filter</div>
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
            </div>
        )
    }
}

export default Header;