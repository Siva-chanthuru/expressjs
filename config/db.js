const mysql2 = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();


const pool  = mysql2.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  
    connectTimeout: 10000


});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ MySQL Connection Failed:', err);
        return;
    }

    console.log('✅ MySQL Connected Successfully!');
    connection.release();
});


const db = pool.promise();
module.exports = db;
