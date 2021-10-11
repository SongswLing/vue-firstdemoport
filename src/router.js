const express = require("express");
const router = express.Router();
const fs = require("fs");
var userlist = {};
fs.readFile("./data/info.json", "utf8", (e, content) => {
  // if (e) return e;
  userlist = content;
  userlist = JSON.parse(userlist);
});
router.get("/login/test", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("ok1");
});

router.post("/login/test1", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  res.send({ id: "1" });
});

// router.get("/login/lists", (req, res) => {
//   fs.readFile("./data/info.json", "utf8", (e, content) => {
//     userlist = content;
//     userlist = JSON.parse(userlist);
//   });
//   console.log(userlist);
//   res.send(userlist);
// });

router.post("/login/hint", (req, res) => {
  // fs.readFileSync("./data/info.json", "utf8", (e, content) => {
  //   userlist = content;
  //   userlist = JSON.parse(userlist);
  // });
  var newlist = userlist.userinfo;
  var boolone = newlist.some((item) => {
    return (
      req.body.username == item.username && req.body.password == item.password
    );
  });
  if (boolone) {
    res.send({
      status: 200,
      message: "登录成功",
      username: req.body.username,
    });
  } else {
    res.send({ status: 404, message: "登录失败" });
  }
});

router.post("/login/sign", (req, res) => {
  var newinfo = req.body;
  // var newlist = userlist;
  // console.log(newlist);
  var bool = userlist.userinfo.some((item) => {
    return item.username == newinfo.username;
  });
  if (bool) {
    res.send({
      status: 2,
      message: "no",
    });
  } else {
    userlist.userinfo.push(newinfo);
    console.log(userlist);
    console.log(typeof userlist);
    userlist = JSON.stringify(userlist);
    fs.writeFileSync("./data/info.json", userlist);

    console.log(userlist);
    res.send({
      status: 1,
      message: "ok",
    });
  }
  var usertemp = fs.readFileSync("./data/info.json").toString();
  usertemp = JSON.parse(usertemp);
  userlist = usertemp;
});

// {
//     "userinfo":[
//         {
//             "username":"15612756242",
//             "password":"111111"
//         },
//         {
//             "username":"19943906124",
//             "password":"222222"
//         }
//     ]
// }
module.exports = router;
