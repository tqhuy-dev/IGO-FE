import React , {Component} from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class SigninComponent extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        datetime: new Date()
    }

    changeDatetime(date) {
        this.setState({
            datetime:date
        })
    }

    render() {
        return (
            <div className="login-container">
                <div className="login-container-header">Signin</div>
                <div className="form">

                    <Form.Group controlId="firstName">
                        <Form.Control type="text" placeholder="Firstname" />
                    </Form.Group>

                    <Form.Group controlId="lastName">
                        <Form.Control type="text" placeholder="Lastname" />
                    </Form.Group>

                    <Form.Group controlId="phone">
                        <Form.Control type="text" placeholder="phone" />
                    </Form.Group>

                    <DatePicker
                        selected={this.state.datetime}
                        onChange={this.changeDatetime.bind(this)}
                    />

                    <br/>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                     </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    
                    <Form.Group controlId="confirmFormBasicPassword">
                        <Form.Control type="password" placeholder="Confirm password" />
                    </Form.Group>

                    <Form.Text className="text-muted link">
                       <Link to={{
                           pathname: '/auth/login'
                       }}>Back to login</Link>
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

export default SigninComponent;