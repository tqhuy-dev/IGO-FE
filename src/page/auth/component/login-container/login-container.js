import React , { Component } from 'react';
import '../login-container/login-container.css';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import sha256  from 'sha256';
import { enviroment } from '../../../../core/enviroment';
import { HASH_KEY, HttpStatus } from './../../../../share/constant';
class LoginContainerComponent extends Component {
    constructor(props) {
        super(props)
    }

    state={
        loginForm:{
            username: '',
            password: ''
        }
    }

    header = {
        'Content-Type': 'application/json'
    };

    moveToSignin() {

    }

    login() {
        let form = {...this.state.loginForm};
        let body = {
            "username": form.username,
            "password": sha256(form.password + HASH_KEY)
        }
        axios.post(enviroment + 'users/login' , body , this.header)
        .then((result) =>{
            if(result.data.status === HttpStatus.OK) {
                alert('Login success');
            } else  {
                alert(result.data.message);
            }
        })
        .catch((error) =>{
            console.log(error);
        })
    }

    showData() {
        axios.get('http://localhost:3000/users/' , this.header)
        .then((result) =>{
            console.log(result.data);
        })
        .catch((error) =>{
            console.log(error);
        })
    }

    handleInputChange(event , type) {
        const newForm = Object.assign({} , this.state.loginForm);
        switch(type) {
            case 'username':
            newForm.username = event.target.value;
            this.setState({
                loginForm: newForm
            })
            break;
            
            case 'password':
            newForm.password = event.target.value;
            this.setState({
                loginForm: newForm
            })
            break;

            default :
        }
    }
    render() {
        return(
            <div className="login-container">
                <div className="login-container-header">Login</div>
                <div className="form">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                        type="text" 
                        placeholder="username" 
                        onChange={(event) => this.handleInputChange(event , 'username')}/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                     </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control 
                        type="password" 
                        placeholder="password"
                        onChange={(event) => this.handleInputChange(event , 'password')} />
                    </Form.Group>
                    <Form.Text className="text-muted link">
                       <Link to={{
                           pathname: this.props.match.url + '/signin'
                       }}>Create an account</Link>
                    </Form.Text>
                    <br/>
                    <Button variant="primary"
                    onClick={() => this.login()}>
                    Login
                    </Button>
                </div>
            </div>
        )
    }
}

export default LoginContainerComponent;