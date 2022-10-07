import React, { Component } from 'react';
import '../index.css';

class TableFaucet extends Component {
    render() {
        return (
            <>
                <table id='prizes'>
                    <tbody>
                        <tr>
                            <th>0-9000</th>
                            <th>1,000 wei</th>
                        </tr>
                        <tr>
                            <th>9001-9500</th>
                            <th>2,000 wei</th>
                        </tr>
                        <tr>
                            <th>9501-9750</th>
                            <th>5,000 wei</th>
                        </tr>
                        <tr>
                            <th>9751-9900</th>
                            <th>10,000 wei</th>
                        </tr>
                        <tr>
                            <th>9901-9975</th>
                            <th>25,000 wei</th>
                        </tr>
                        <tr>
                            <th>9976-9998</th>
                            <th>100,000 wei</th>
                        </tr>
                        <tr>
                            <th>9999</th>
                            <th>1,000,000 wei</th>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    }
}

export default TableFaucet;