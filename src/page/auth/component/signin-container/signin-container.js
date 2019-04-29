import React , {Component} from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import sha256 from 'sha256';
import { enviroment } from './../../../../core/enviroment';
import { HASH_KEY } from './../../../../share/constant';
class SigninComponent extends Component {

    state = {
        user:{
            username: '',
            password: '',
            confirm:'',
            firstName: '',
            lastName: '',
            phone: '',
            birthdate: new Date()
        }
    }

    changeDatetime(date) {
        let userState = {...this.state.user};
        userState.birthdate = date;
        this.setState({
            user: userState
        })
    }

    handleChangeInput(event , type) {
        let dataUser = {...this.state.user};
        switch(type) {
            case 'username':
            dataUser.username = event.target.value;
            break;

            case 'password':
            dataUser.password = event.target.value;
            break;

            case 'firstName':
            dataUser.firstName = event.target.value;
            break;

            case 'lastName':
            dataUser.lastName = event.target.value;
            break;

            case 'phone':
            dataUser.phone = event.target.value;
            break;

            case 'confirm':
            dataUser.confirm = event.target.value;
            break;

            default :
            dataUser.username = '';
        }

        this.setState({
            user: dataUser
        });
    }

    signup() {
        if(this.state.user.password !== this.state.user.confirm) {
            
            alert('password not same');
            return;
        }
        let bodySignup = {
            username: this.state.user.username,
            password: sha256(this.state.user.password + HASH_KEY),
            first_name: this.state.user.firstName,
            last_name: this.state.user.lastName,
            phone: this.state.user.phone,
            birthday: new Date(this.state.user.birthdate),
            avatar: ''
        }

        axios.post(enviroment + 'users/' , bodySignup)
        .then((result) =>{
            console.log(result);
        })
        .catch((error) =>{
            alert(error.message);
        })

    }

    render() {
        return (
            <div className="login-container">
                <div className="login-container-header">Signin</div>
                <div className="form">

                    <Form.Group controlId="firstName">
                        <Form.Control type="text" placeholder="Firstname"
                            onChange={(event) => this.handleChangeInput(event ,'firstName')}
                        />
                    </Form.Group>

                    <Form.Group controlId="lastName">
                        <Form.Control type="text" placeholder="Lastname" 
                            onChange={(event) => this.handleChangeInput(event , 'lastName')}
                        />
                    </Form.Group>

                    <Form.Group controlId="phone">
                        <Form.Control type="text" placeholder="phone" 
                            onChange={(event) => this.handleChangeInput(event , 'phone')}
                        />
                    </Form.Group>

                    <DatePicker
                        selected={this.state.user.birthdate}
                        onChange={this.changeDatetime.bind(this)}
                    />

                    <br/>
                    <Form.Group controlId="username">
                        <Form.Control type="text" placeholder="Enter email" 
                            onChange={(event) => this.handleChangeInput(event , 'username')}
                        />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                     </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Control type="password" placeholder="Password" 
                            onChange={(event) => this.handleChangeInput(event , 'password')}
                        />
                    </Form.Group>
                    
                    <Form.Group controlId="confirmFormBasicPassword">
                        <Form.Control type="password" placeholder="Confirm password" 
                            onChange={(event) => this.handleChangeInput(event , 'confirm')}
                        />
                    </Form.Group>

                    <Form.Text className="text-muted link">
                       <Link to={{
                           pathname: '/auth/login'
                       }}>Back to login</Link>
                    </Form.Text>
                    <br/>
                    <Button variant="primary" type="submit" 
                    onClick={() => this.signup()}>
                    Submit
                    </Button>
                </div>
            </div>
        )
    }
}

export default SigninComponent;