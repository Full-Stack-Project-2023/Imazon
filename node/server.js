const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer(function (request, response) {
    var parseUrl = url.parse(request.url, true);
    var path = parseUrl.pathname;

    if (path === '/html/registered.html' && request.method === 'POST') {
        response.statusCode = 200;
        response.setHeader('Content-type', 'text/html;charset=UTF-8');
        const ajaxdata = [];
        request.on('data', (data) => {
            ajaxdata.push(data);
        });
        request.on('end', () => {
            const string = Buffer.concat(ajaxdata).toString();
            const jsondata = JSON.parse(string);
            const newdata = {
                email: jsondata.email,
                password: jsondata.password
            };
            const mysql = JSON.parse(fs.readFileSync('../db/mysql.json'));
            mysql.push(newdata);
            fs.writeFileSync('../db/mysql.json', JSON.stringify(mysql));
            response.end();
        })
    }
    else if (path === '/html/Sign_In.html' && request.method === 'POST') {
        response.setHeader('Content-type', 'text/html;charset=UTF-8');
        const arr = [];
        request.on('data', (data) => {
            arr.push(data);
        });
        request.on('end', () => {
            const arrdata = JSON.parse(arr);
            const sql = JSON.parse(fs.readFileSync('../db/mysql.json'));
            const n = sql.find((val) => {
                return val.password === arrdata.password && val.email === arrdata.email;
            });
            if (n === undefined) {
                response.statusCode = 400;
            } else {
                response.statusCode = 200;
            }
            response.end();
        })
    }
    else {
        const x = path === '/' ? '/index.html' : path;
        let suffix = x.slice(x.lastIndexOf('.') + 1);
        const type = {
            "html": "text/html",
            "css": "text/css",
            "js": "text/javascript",
            'png': 'image/png',
            'jpg': 'image/jpeg'
        }
        response.setHeader('Content-Type', `${type[suffix] || "text/html"};charset=utf-8`);
        try {
            response.write(fs.readFileSync(`..${x}`));
            response.statusCode = 200;
        } catch {
            response.write('Page 404');
            response.statusCode = 404;
        }
        response.end();
    }
}).listen(8080);