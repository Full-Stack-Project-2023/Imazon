var http = require('http')
var url = require('url')
var fs = require('fs')

var server = http.createServer(function (request, response) {
    var parseUrl = url.parse(request.url, true)
    var path = parseUrl.pathname

    if (path === '/registered.html' && request.method === 'POST') {
        response.statusCode = 200
        response.setHeader('Content-type', 'text/html;charset=UTF-8')
        const ajaxdata = []
        request.on('data', (data) => {
            ajaxdata.push(data)
        })
        request.on('end', () => {
            const string = Buffer.concat(ajaxdata).toString()
            const jsondata = JSON.parse(string)
            const mysql = JSON.parse(fs.readFileSync('./mysql.json'))
            const newdata = {
                email: jsondata.email,
                password: jsondata.password
            }
            mysql.push(newdata)
            fs.writeFileSync('./mysql.json', JSON.stringify(mysql))
        })
        response.end()
    }
    else if (path === '/Sign_In.html' && request.method === 'POST') {
        response.statusCode = 200
        response.setHeader('Content-type', 'text/html;charset=UTF-8')
        let arr = []
        request.on('data', (data) => {
            arr.push(data)
        })
        request.on('end', () => {
            const arrdata = JSON.parse(arr)
            let sql = JSON.parse(fs.readFileSync('./mysql.json'))
            const n = sql.find((val) => {
                return val.password === arrdata.password && val.email === arrdata.email
            })
            if (n === undefined) {
                response.statusCode = 400
            } else {
                response.statusCode = 200
            }
            response.end();
        })
    }
    else {
        const x = path === '/' ? '/index.html' : path
        let num = x.lastIndexOf('.')
        let suffix = x.slice(num + 1)
        const type = {
            "html": "text/html",
            "css": "text/css",
            "js": "text/javascript",
            'png': 'image/png',
            'jpg': 'image/jpeg'
        }
        response.setHeader('Content-Type', `${type[suffix] || "text/html"};charset=utf-8`)
        try {
            response.write(fs.readFileSync(`.${x}`));
            response.statusCode = 200
        } catch {
            response.write('Nope, not toady.')
            response.statusCode = 404
        }
        response.end()
    }
})

server.listen(8080);