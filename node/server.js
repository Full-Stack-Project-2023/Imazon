const http = require('http');
const url = require('url');
const fs = require('fs');
const mysql = require('mysql');

require('dotenv').config();

var con = mysql.createConnection({
    host: process.env.RDS_HOST,
    port: process.env.RDS_PORT,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE
});

con.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
    }
    console.log('Connected to database as ID', con.threadId);
});

//mysql
http.createServer(function (request, response) {
    const parseUrl = url.parse(request.url, true);
    const path = parseUrl.pathname;

    if (path === '/html/Sign_up.html' && request.method === 'POST') {
        response.statusCode = 200;
        response.setHeader('Content-type', 'text/html;charset=UTF-8');
        const ajaxdata = [];
        request.on('data', (data) => {
            ajaxdata.push(data);
        });
        request.on('end', () => {
            const string = Buffer.concat(ajaxdata).toString();
            const jsondata = JSON.parse(string);
            const sql = `INSERT INTO userInfo (email, password) VALUE ('${jsondata.email}', '${jsondata.password}')`;
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Sign up success");
            });
            response.end();
        })
    }
    else if (path === '/html/Sign_In.html' && request.method === 'POST') {
        response.setHeader('Content-type', 'text/html;charset=UTF-8');
        const ajaxdata = [];
        request.on('data', (data) => {
            ajaxdata.push(data);
        });
        request.on('end', () => {
            const arrdata = JSON.parse(ajaxdata);
            const sql = `SELECT * FROM userInfo WHERE email = '${arrdata.email}' AND password = '${arrdata.password}'`;
            con.query(sql, function (err, result) {
                ;
                if (err) throw err;
                if (result[0] === undefined) {
                    response.statusCode = 400;
                } else {
                    response.statusCode = 200;
                }
                response.end();
            });
        })
    }
    else {
        const x = path === '/' ? '/index.html' : path;
        const suffix = x.slice(x.lastIndexOf('.') + 1);
        const type = {
            "html": "text/html",
            "css": "text/css",
            "js": "text/javascript",
            'png': 'image/png',
            'jpg': 'image/jpeg'
        }
        response.setHeader('Content-Type', `${type[suffix] || "text/html"};charset=utf-8`);
        try {
            response.write(fs.readFileSync(`.${x}`));
            response.statusCode = 200;
        } catch {
            response.write('Page 404');
            response.statusCode = 404;
        }
        response.end();
    }
}).listen(8080);