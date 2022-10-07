const mysql = require("mysql");
const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'Hmelcon2000!',
    database        : 'faucet'
});

const querier = (query) =>{
    return new Promise((resolve, reject)=>{
        pool.query(query,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

module.exports = {
    querier
}