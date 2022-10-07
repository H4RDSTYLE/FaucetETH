import React, { Component } from 'react';
import "../index.css";

class About extends Component {
    render() {
        return (
            <div className='center bgBrown'>
                <h1>About us</h1>
                <p className='lead'>This is a faucet created by <a id='myLinkedin' href='https://www.linkedin.com/in/hugomelon/'>H4RDSTYLE</a> it was created with educational purposes.<br/>
                If the faucet gets empty of funds I won't recharge it. Feel free to donate to the wallet which mantains the faucet<br/>
                Wallet: TODO</p>
            </div>
        );
    }
}

export default About;