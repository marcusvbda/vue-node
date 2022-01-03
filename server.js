require("dotenv").config();

const express = require("express");
const randomId = require("random-id");
const app = express(),
  bodyParser = require("body-parser");
port = 3070;

// place holder for the data
const users = [
  {
    id: "1",
    firstName: "first1",
    lastName: "last1",
    email: "abc@gmail.com",
  },
  {
    id: "2",
    firstName: "first2",
    lastName: "last2",
    email: "abc@gmail.com",
  },
  {
    id: "3",
    firstName: "first3",
    lastName: "last3",
    email: "abc@gmail.com",
  },
];

const isProduction = process.env.NODE_ENV == "production";
const path = process.cwd();
const distPath = `${path}/frontend/dist`;

app.use(bodyParser.json());
if (isProduction) {
  app.use(express.static(distPath));
}

app.get("/api/users", (req, res) => {
  console.log("api/users called!!!!!!!");
  res.json(users);
});

app.post("/api/user", (req, res) => {
  const user = req.body.user;
  user.id = randomId(10);
  console.log("Adding user:::::", user);
  users.push(user);
  res.json("user addedd");
});

app.get("/", (req, res) => {
  if (isProduction) {
    return res.sendFile(`${distPath}/index.html`);
  }
  res.send("api is running ...");
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
