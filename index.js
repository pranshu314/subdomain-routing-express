const express = require("express");
const vhost = require("vhost");
const app = express();
const port = 5000;

let dict = [
  {
    subdomain: "example",
    color: "blue",
  },
  {
    subdomain: "example2",
    color: "red",
  },
];

app.use(express.json());

const main = express.Router();
const sub = express.Router();

app.post("/subdomain-create", (req, res) => {
  let obj = {
    subdomain: req.body.subdomain,
    color: req.body.color,
  };

  for (let i = 0; i < dict.length; i++) {
    if (dict[i].subdomain === obj.subdomain) {
      res.send("The given subdomain already exists");
      return;
    }
  }
  dict.push(obj);
  res.send("Created a new subdomain entry");
});
main.use(express.static("frontend-main"));
sub.get("/get-color", (req, res) => {
  for (let i = 0; i < dict.length; i++) {
    if (dict[i].subdomain === req.vhost[0]) {
      res.send({ color: dict[i].color });
      return;
    }
  }
  res.send({});
});

sub.use((req, res, next) => {
  subdomain = req.vhost[0];

  let flag = 0;
  for (let i = 0; i < dict.length; i++) {
    if (dict[i].subdomain === subdomain) {
      flag = 1;
      next();
    }
  }
  if (flag === 0) {
    res.send("No such subdomain exists");
  }
});
sub.use(express.static("frontend-sub"));

app.use(vhost("*", main));
app.use(vhost("*.*", sub));

// app.use(vhost("*.*.*", main));
// app.use(vhost("*.*.*.*", sub));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
