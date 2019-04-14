import React , { Component } from 'react';
import '../login-container/login-container.css';
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
class LoginContainerComponent extends Component {
    constructor(props) {
        super(props)
    }

    moveToSignin() {

    }

    render() {
        return(
            <div className="login-container">
                <div className="login-container-header">Login</div>
                <div className="form">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="username" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                     </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="password" />
                    </Form.Group>
                    <Form.Text className="text-muted link">
                       <Link to={{
                           pathname: this.props.match.url + '/signin'
                       }}>Create an account</Link>
                    </Form.Text>
                    <br/>
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                </div>
            </div>
        )
    }
}

export default LoginContainerComponent;