const mysql = require("mysql");
const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : '172.17.0.1',
    user            : 'root',
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