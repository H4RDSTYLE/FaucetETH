import React, { Component } from 'react';
import "../index.css";

type MyProps = { wallet: string};
class Widthdraw extends Component<MyProps> {
    render() {
        return (
            <div className='center bgBrown'>
                <h1>Widthdraw</h1>
                <label>Number of WEI to Widthdraw: <input id="quantity" type={'number'} min='0'/></label>
                <button className='btn btn-success marginLeft' value='Widthdraw' onClick={this.handleWidthdraw}>Widthdraw</button>
            </div>
        );
    }

    handleWidthdraw = () =>{
        console.log("llamado");
        var quantity : HTMLInputElement = document.getElementById("quantity") as HTMLInputElement;
        fetch('http://localhost:1234/widthdraw?wallet=' + this.props.wallet + '&&quantity=' + quantity.value)
        .then(response => response.json())
        .then(json => console.log(json));
    }
}

export default Widthdraw;