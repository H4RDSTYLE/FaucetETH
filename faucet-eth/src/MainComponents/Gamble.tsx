import React, { Component } from 'react';

class Gamble extends Component {
    render() {
        return (
            <div className='centerDiv bgBrown'>
                <h1 className='center'>Gamble</h1>
                <form className='center'>
                    <fieldset>
                        <p>Select High if you think that the RNG will be more than 55 or Low if you think that will be less than 45.<br/>If you win you will get 2x the quantity you have bet!</p>
                        <label>
                            <input type="radio" name="color" value="high"/> High
                        </label>
                        <label>
                            <input type="radio" name="color" value="low"/> Low
                        </label>
                    </fieldset>
                    <label>Bet Amount: <input type={'number'} min='0' /></label>
                    <input className='btn btn-success marginLeft' type={'submit'} value='Bet'/>
                </form>
            </div>
        );
    }
}

export default Gamble;