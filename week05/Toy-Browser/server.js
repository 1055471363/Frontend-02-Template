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
        #container{
        width: 500px;
        height: 300px;
        display: flex;
        background-color: rgb(255,255,255);
        }
        #container #myid{
        width: 200px;
        height: 100px;
        background-color: rgb(255,0,0);
        }
        #container .c1{
        flex: 1;
        background-color: rgb(0,255,0);
        }
    </style>
</head>
<body>
    <div id="container">
        <div id="myid"><div/>
        <div class="c1"></div>
    </div>
</body>
</html>`)
    })
}).listen(8080);

console.log('server starte')
