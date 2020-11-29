const http = require("http");
const https = require("https");

const unzipper = require("unzipper");
const querystring = require("querystring");

// 2.auth路由：接受code，用code+client_id+client_secret换token
function auth(request, resopse) {
  let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1]);
  getToken(query.code, function (info) {
    console.log(info);
    // resopse.write(JSON.stringify(info));
    resopse.write(
      `<a href='http://localhost:8083/?token=${info.access_token}'>publish</a>`
    );
    resopse.end();
  });
}

function getToken(code, callback) {
  let request = https.request(
    {
      hostname: "github.com",
      path: `/login/oauth/access_token?code=${code}&client_id=Iv1.3d0a2517420dafc6&client_secret=8ffcc2b62c1f5c821a33c037c60237e61f2f660d`,
      port: 443,
      method: "POST",
    },
    function (resopse) {
      let body = "";
      resopse.on("data", (chunk) => {
        body += chunk.toString();
      });

      resopse.on("end", (chunk) => {
        callback(querystring.parse(body));
      });
    }
  );
  request.end();
}

// 4.用token获取用户信息，检查权限 publish 路由接受发布
function publish(request, resopse) {
  let query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1]);
  getUser(query.token, (info) => {
    if (info.login === "1055471363") {
      request.pipe(unzipper.Extract({ path: "../server/public" }));
      request.on('end',function(){
          resopse.end('success')
      })
    }
  });
}

function getUser(token,callback) {
  let request = https.request(
    {
      hostname: "api.github.com",
      path: `/user`,
      port: 443,
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
        "User-Agent": "toy-pubish",
      },
    },
    function (resopse) {
      let body = "";
      resopse.on("data", (chunk) => {
        body += chunk.toString();
      });
      resopse.on("end", (chunk) => {
        callback(querystring.parse(body));
      });
    }
  );
}

http
  .createServer(function (request, resopse) {
    if (request.url.match(/^\/auth\?/)) return auth(request, resopse);
    if (request.url.match(/^\/publish\?/)) return publish(request, resopse);

    // console.log("req");
    // // let outFile = fs.createWriteStream("../server/public/tmp.zip");
    // req.pipe(unzipper.Extract({ path: "../server/public" }));
  })
  .listen(8082);
