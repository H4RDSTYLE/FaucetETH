import React, { Component } from 'react';
import metamaskIcon from "../images/metamask-logo.png";
import {ethers} from 'ethers';
type MyProps = { onLogin: any};
class Login extends Component<MyProps> {
    render() {
        return (
            <div className='center bgBrown'>
                <h1>Whoops you should Login before claim some ethers!</h1>
                <h3>Login</h3>
                <button onClick={this.props.onLogin}><img style={{width: 50}} src={metamaskIcon}  alt="Log In" /></button>
            </div>
        );
    }
}

export default Login;


