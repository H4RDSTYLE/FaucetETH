import { Component } from 'react';
import TableFaucet from '../secondaryElements/TableFaucet';
type MyProps = { wallet: string};
class Faucet extends Component<MyProps>{
    render() {
        return (
            <>
                <div className='centerDiv bgBrown'>
                    <h1 className='center'>Press the button and win a prize in eth each 24 hours!</h1>
                    <TableFaucet></TableFaucet>
                    <div id="resultOfClaim" style={{display: 'none'}}></div>
                    <button type="button" className='btn btn-success' onClick={this.handleClaim}>I want to win a prize</button>
                </div>
                
            </>
        );
    }

    handleClaim = () =>{
        fetch("http://"+window.location.hostname+ ':8000/claim?wallet=' + this.props.wallet)
        .then(response => response.json())
        .then(json => this.postClaimHandle(json));
    }
    
    postClaimHandle(json: string) {
        let objJson = JSON.parse(json);
        var message: string = "";
        var resultOfClaim: HTMLDivElement = document.getElementById("resultOfClaim") as HTMLDivElement;
        if(objJson.prize){
            message = "You have won " + objJson.prize + " weis.";
        }else{
            message = "Oooops... It looks like you cant claim yet."
            resultOfClaim.style.background = "#c02020";
        }
        resultOfClaim.innerHTML = message;
        resultOfClaim.addEventListener("click", ()=>{
            resultOfClaim.style.display = "none";
        })
        resultOfClaim.style.display = "";
    }

    getButton = async(wallet: string) =>{
        fetch("http://"+window.location.hostname+':8000/canLogin?wallet=' + wallet)
        .then(res =>res.json())
        .then(json => console.log(json))
        .catch(err => console.log('Solicitud fallida', err)); // Capturar errores
    }
}

export default Faucet;