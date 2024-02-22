const express = require("express");
const vhost = require("vhost");
const app = express();
const port = 3000;

let dict = [
  {
    subdomain: "example",
    color: "Black",
  },
];

app.use(express.json());

const main = express.Router();
const sub = express.Router();

main.use(express.static("frontend-main"));
main.post("/subdomain-create", (req, res, next) => {
  let obj = {
    subdomain: req.body.subdomain,
    color: req.body.color,
  };

  dict.push(obj);
  res.send("Created a new subdomain entry");
});
main.get("/:subdomain", (req, res) => {
  for (let i = 0; i < dict.length; i++) {
    if (dict[i].subdomain === req.params.subdomain) {
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

app.use(vhost("localhost", main));
app.use(vhost("*.localhost", sub));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
