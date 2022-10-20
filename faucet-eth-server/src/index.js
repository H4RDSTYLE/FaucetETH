const express = require("express");
const app = express();
const {querier} = require("./bbdd");
const {sendEther} = require("./ethereumSender");

const msHasADay = 86400000;
  
app.listen(8000, () => {
  console.log(`Server listening on 8000`);
  createTableIfNotExists();
});

app.get('/login', async(req,res)=>{
    console.log(`login`);
    var wallet = req.query.wallet;
    var isTheWalletRegistered = (await isRegistered(wallet));
    if(!isTheWalletRegistered){
        register(wallet);
    }
    var response = "logged in as " + wallet;
    console.log(response);
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    res.json(JSON.stringify(response));
});
app.get('/timeTillClaim', async(req,res)=>{

    var msLeft = ((msHasADay + await getLastClaim(req.query.wallet) - Date.now()));
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    res.json(JSON.stringify(msLeft));
});
app.get('/claim', async (req, res)=>{
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    var wallet = req.query.wallet;
    var response = "";
    try{
        if(await isClaimable(wallet)){
            setLastClaim(wallet);
            var prize = await claim(wallet);
            response= {"error" : false, "claim" : true, "prize" : prize};
        }else{
            response= {"error" : false, "claim" : false};
        }
    }catch(e){
        response= {"error" : true};
    }finally{
        res.json(JSON.stringify(response));
    }
});
app.get('/jugar', (req, res)=>{
    var numAleatorio = Math.floor(Math.random()*(100+1));
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    res.send(numAleatorio.toString());
});
 
app.get('/widthdraw', (req,res)=>{
    var withdrawQuantity = req.query.quantity;
    var wallet = req.query.wallet;
    if(isWidthdrawable(wallet, withdrawQuantity)){
        widthdraw(wallet, withdrawQuantity);
    }
});

function getPrize(num){
    if(num>0&&num<=9000){return 1000;}
    if(num>9000&&num<=9500){return 2000;}
    if(num>9501&&num<=9750){return 5000;}
    if(num>9751&&num<=9900){return 10000;}
    if(num>9901&&num<=9975){return 25000;}
    if(num>9976&&num<=9998){return 100000;}
    if(num==9999){return 1000000;}
}
async function isClaimable(wallet){
    msSinceEpochNow = Date.now();
    msLastClaim = await getLastClaim(wallet);
    console.log(msLastClaim);
    if((msSinceEpochNow-msLastClaim)<msHasADay){
        return false;
    }
    return true;
}

function getLastClaim(wallet){
    return querier('SELECT (UNIX_TIMESTAMP(lastClaim)*1000) as timeStamp FROM walletInfo where wallet = "' + wallet + '"').then((rows) => {
        return rows[0].timeStamp;
        }
    )
}
async function setLastClaim(wallet){
    var date = new Date();
    var formatedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    await querier('UPDATE `walletInfo` SET `lastClaim`= "' + formatedDate + '" where `wallet` = "' + wallet + '"').then((rows) => {
        console.log(rows.affectedRows);
    });
}
async function claim(wallet){
    var randomNumber = Math.floor(Math.random()*(9999+1));
    var prize = getPrize(randomNumber);
    var totalBalance = await getBalance(wallet) + prize;
    await setBalance(wallet, totalBalance);
    return prize;
}

async function getBalance(wallet){
    return await querier('SELECT balance from walletInfo where wallet = "' + wallet + '"').then(rows => rows[0].balance);
}

async function setBalance(wallet, balance){
    console.log("set balance");
    console.log(balance);
    await querier('UPDATE walletInfo SET balance = ' + balance + ' where wallet = ' + '"' + wallet + '"').then((rows) => {
        console.log(rows.affectedRows);
    });
}


async function widthdraw(wallet, withdrawQuantity){
    var actualBalance = await getBalance(wallet);
    var totalBalance = actualBalance - withdrawQuantity;
    await setBalance(wallet, totalBalance);
    await sendEther(wallet, withdrawQuantity);
}

async function register(wallet){
    querier('INSERT INTO walletInfo (`wallet`, `balance`) values ("' + wallet + '", '+ 0 + ');').then((rows) => {
        console.log("registrado");
    })
}

async function isRegistered(wallet){
    const returnValue =  await querier('SELECT EXISTS (SELECT * FROM walletInfo WHERE wallet="' + wallet +'") as exist').then((rows) => {
        var isOnDb = rows[0].exist;
        if(!isOnDb){
            return false;
        }
        return true;
    });
    return returnValue; 
}

async function isWidthdrawable(wallet, withdrawQuantity){
    return balance = await querier('SELECT `balance` from `walletInfo` where `wallet`="' + wallet + '"')
    .then(rows => rows[0].balance)
    .then(totalBalance => totalBalance>=withdrawQuantity?true:false)
}

async function createTableIfNotExists(){
    await querier('CREATE TABLE IF NOT EXISTS `walletInfo` (`wallet` varchar(42) NOT NULL,`lastClaim` datetime DEFAULT NULL,`balance` bigint DEFAULT NULL,PRIMARY KEY (`wallet`))')
    .then(console.log("query executed"));
}