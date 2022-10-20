const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const express = require('express');

const app = express();

const myAddress = '0xface241f297207613Ea4077fA2705f47f6F5596B';
const privateKey = 'ef11888ee5a458bf31eaa9778b8cb3a2a01056244d18ad55bb02bf307eab0f1e';
const rpcurl = "https://goerli.infura.io/v3/9b0bc1473eff4cba89b4db29beabc730";

const sendEther =  async(receiverAddress, quantity)=>{
  console.log("in function");
  var provider = new Provider(privateKey, rpcurl);
  var web3 = new Web3(provider);
  console.log("provider set transaction initiated");
  web3.eth.sendTransaction({
    from: myAddress,
    to: receiverAddress,
    value: quantity
  })
  .then(function(receipt){
    console.log(receipt);
  });
}

module.exports = {
  sendEther
}