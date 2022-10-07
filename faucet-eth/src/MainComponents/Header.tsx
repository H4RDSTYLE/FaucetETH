import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ethlogo from "../images/ethlogo.png";
import "../index.css";

class Menu extends Component {
    render() {
        return (
            <header>  
                <h1 id="titleHeader">The Free Ethers Web Page</h1>
                <img src={ethlogo} id="logoHeader"/> 
                <nav id="linkBar">
                    <Link to="/faucet">Faucet</Link>
                    <Link to="/withdraw">Withdraw</Link>
                    <Link to="/gamble">Gamble</Link>
                    <Link to="/about">About</Link>
                </nav>
            </header>
        );
    }
}

export default Menu;