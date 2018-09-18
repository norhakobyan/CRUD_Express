const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var current_id = 3;

let users = [
  {id: 1, username: "vardanator", password: "iambredpitt", age: 28},
  {id: 2, username: "musho", password: "iamdicabrio", age: 26}
];

let users_tbl = {
  "1": {username: "vardanator", password: "iambredpitt", age: 28},
  "2": {username: "musho", password: "iamdicabrio", age: 26}
};

app.use((req, res, next) => {
  console.log("request " + req.url + " " +new Date().toISOString().slice(0, 10));
  next();
});

app.get("/users", (req, res) => {
  res.send(users_tbl);
})

app.get("/users/:id", (req, res) => {
  /*
  users.forEach(u => {
    if(u.id == req.params.id) {
      return res.send(u);
    }
  });
  res.status(404).send("Not Found");
  */

  /*
  if(!users_tbl[req.params.id]) {
    return res.status(404).send("Not Found");
  }
  res.send(users_tbl[req.params.id]);
  */
  return res.send(users_tbl[req.params.id] || ("Not Found"));
});

app.post("/users", (req, res) => {
  users_tbl[current_id++] = {
    username: req.body.username,
    age: req.body.age,
    password: req.body.password
  };
  res.send("success");
})

app.put("users/:id", (req, res) => {
  if(!users_tbl[req.params.id]) {
    return res.status(404).send("Not Found")
  }
  let user = users_tbl[req.params.id];
  if(req.body.username) {
    user.username = req.body.username;
  }
  user.password = req.body.password || user.password;
  if(parseInt(req.body.age) > 0) {
    user.age = parseInt(req.body.age);
  }
  req.send(user);
});

app.delete("/users/:id", (req, res) => {
  if(!users_tbl[req.params.id]) {
    return res.status(404).send("No such user");
  }
  users_tbl[req.params.id] = null;
});





app.listen(3000);
