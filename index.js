const express = require("express");
const app = express();
const path = require("path");
const port = 3030;
const router = require("./src/router");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); //允许所有访问来源
//   res.header("Access-Control-Allow-Headers", "X-Requested-With"); //允许访问控制报头X-Requested-With:xhr请求
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); //允许访问方法
//   next();
// });

app.use(router);

app.listen(port, () => {
  console.log(`端口运行在http://localhost:${port}`);
});
