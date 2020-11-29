const http = require("http");
const fs = require("fs");
const archiver = require("archiver");
const child_process = require("child_process");
const querystring = require("querystring");

//1。打开 GET https://github.com/login/oauth/authorize winx下用start
child_process.exec(
  `start https://github.com/login/oauth/authorize?client_id=Iv1.3d0a2517420dafc6`
);
//3.创建server,接受token,点击后发布
http
  .createServer(function (request, resopse) {
    let query = querystring.parse(request.url.match(/^\/\?([\s\S]+)$/)[1]);
    publish(query.token);
  })
  .listen(8083);

function publish(token) {
  let request = http.request(
    {
      hostname: "127.0.0.1",
      port: "8082",
      method: "POST",
      path: "/publish?token=" + token,
      headers: {
        "Content-Type": "application/octet-stream",
        //   "Content-Length": stats.size,
      },
    },
    (response) => {
      // console.log(response)
    }
  );
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Sets the compression level.
  });
  archive.directory("./sample/", false);

  archive.pipe(request);

  archive.finalize();
}

// fs.stat("./sample.html",(err,stats)=>{

// let file = fs.createReadStream("./sample.html");

// file.pipe(request)
// file.on('end',()=>request.end())
// }) */
