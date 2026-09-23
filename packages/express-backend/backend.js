import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


app.get("/users/:id", (req, res) => {
  userService
    .findUserById(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(200).send(user);
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.get("/users", (req, res) => {
  const { name, job } = req.query;

  userService
    .getUsers(name, job)
    .then((users) => {
      res.status(200).send({ users_list: users });
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.post("/users", (req, res) => {
  userService
    .addUser(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
});

app.delete("/users/:id", (req, res) => {
  userService
    .removeUser(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});