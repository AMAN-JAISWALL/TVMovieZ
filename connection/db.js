import mysql from 'mysql2/promise';
import env from 'dotenv';
env.config();

export let db;

try {
    db = await mysql.createConnection({

        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE

        // host: process.env.HOST,
        // port: process.env.PORT,
        // user: process.env.USER,
        // password: process.env.PASSWORD,
        // database: process.env.DATABASE
    });
    console.log("database connected successfully");
} catch (error) {
    console.log("database not connected==>",error);    
}

