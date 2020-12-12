async function Connect() {
    //MariaDB Login//
    const mariadb = require('mariadb');
    const pool = mariadb.createPool({
     host: process.env.HOST,
     user: process.env.USER, 
     password: process.env.PASSWORD,
     database: 'projeto_exodus',
     socketPath: 'MariaDB'
     
});
return pool;
}

//Program//
Connect();

async function request() {
    const conn = await Connect();
    const [rows] = await conn.query(`SELECT ismacroon FROM users WHERE username = 'Erik Jonatan'`);
    return rows;
}

async function Update(arg) {
    const conn = await Connect();
    const res = await conn.query(`UPDATE users SET ismacroon = ${arg} WHERE username = 'Erik Jonatan'`);
};

module.exports = {request, Update};


