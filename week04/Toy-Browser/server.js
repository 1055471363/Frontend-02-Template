const http = require('http');

http.createServer((req, res) => {
    let body = []
    req.on('error', (err) => {
        console.error(err)
    }).on('data', (chunk) => {
        body.push(chunk.toString())
    }).on('end', () => {
        console.log(body)
        // body = Buffer.concat(body).toString()
        console.log('body:', body)
        // res.writeHead(200, {'Content-Type': 'text/html'})
        res.setHeader('Content-Type', 'text/html')
        res.setHeader('X-Foo', 'bar')
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end(`
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        body div #myid {
            width: 100px;
            background-color: #ff5000;
        }

        body div img {
            width: 30px;
            background-color: #ff1111;
        }

    </style>
</head>
<body>
    <div>
        <img id="myid">
        <img/>
    </div>
</body>
</html>`)
    })
}).listen(8080);

console.log('server starte')
