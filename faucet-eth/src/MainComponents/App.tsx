import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './About';
import Faucet from './Faucet';
import Gamble from './Gamble';
import Header from './Header';
import Login from './Login';
import Widthdraw from './Widthdraw';

class App extends Component {
    state = {
        wallet: ''
    }
    render() {
        return (
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path="/" element={this.manageLogin("faucet")}/>
                        <Route path="faucet" element={this.manageLogin("faucet")}/>
                        <Route path="gamble" element={this.manageLogin("gamble")}/>
                        <Route path="withdraw" element={this.manageLogin("widthDraw")}/>
                        <Route path="about" element={this.manageLogin("about")}/>
                        <Route path="*" element={this.manageLogin("faucet")}/>
                    </Routes>
                    </BrowserRouter>
        );
    }

    manageLogin = (e: string) => {
        if(this.state.wallet==''){
            return <Login onLogin={this.handleLogin}></Login>;
        }else{
            if(e=="gamble"){
                return <Gamble></Gamble>;
            }else if(e=="widthDraw"){
                return <Widthdraw wallet={this.state.wallet}></Widthdraw>;
            }else if(e=="about"){
                return <About></About>;
            }else{
                return <Faucet wallet={this.state.wallet}></Faucet>;
            }
        }
    }

    handleLogin = async () =>{
        if(window.ethereum){
            await window.ethereum.request({
                method: "wallet_requestPermissions",
                params: [
                {
                    eth_accounts: {},
                },
                ],
            });
            window.ethereum.request({method:'eth_requestAccounts'}).then((result: string)=>{
                this.passLoginDataToServer(result);
                this.setState({wallet: result});
            })  
        }else{
            alert("You don't have metamask extension, redirecting you to Metamask...");
            window.open("https://metamask.io/download/", '_blank');
        }
    }

    passLoginDataToServer = (wallet: string) => {
        fetch('http://localhost:1234/login?wallet=' + wallet)
        .then(res =>res.json())
        .then(json => console.log(json))
        .catch(err => console.log('Solicitud fallida', err)); // Capturar errores
    }

    
}

export default App;
