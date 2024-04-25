require('dotenv').config();

const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    password: 'postKeyPass#75',
    host: 'localhost',
    port: '5432',
    database: 'todo_project'
});

client.connect((err) => {
    if(err) {
        console.error(err.message);
    } else {
        console.log('DB connection successful');
    }
});

module.exports = client;