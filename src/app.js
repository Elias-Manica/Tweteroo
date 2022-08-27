import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let users = [];

let tweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  const userLogin = users.find((value) => value.username === username);

  if (userLogin) {
    res.status(400).send("Usuário já logado");
    return;
  }

  users.push({
    username,
    avatar,
    id: users.length + 1,
  });

  res.status(201).send("OK");
});

{
  /*app.post("/sign-up", (req, res) => {
  const { user, avatar } = req.headers;

  if (!user || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  const userLogin = users.find((value) => value.username === user);

  if (userLogin) {
    res.status(400).send("Usuário já logado");
    return;
  }

  users.push({
    user,
    avatar,
    id: users.length + 1,
  });

  res.status(201).send("OK");
});*/
}

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

  if (!username || !tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  const userPost = users.find((value) => value.username === username);

  if (userPost) {
    tweets.push({
      username,
      tweet,
      id: tweets.length + 1,
    });
    res.status(201).send("OK");
    return;
  }

  res
    .status(400)
    .send({ error: "Não há nenhum usuário cadastrado com esse nome" });
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/tweets", (req, res) => {
  const { page } = req.query;

  let numberStop = 1;

  if (Number(page) <= 0) {
    res.status(400).send("Informe uma página válida!");
    return;
  }

  let i = tweets.length - 1;

  if (page) {
    numberStop = Number(page);
  }

  if (Number(page) > 1) {
    i = tweets.length - 1 - (numberStop - 1) * 10;
  }

  let tenTweets = [];

  for (i; i >= 0; i--) {
    if (tenTweets.length >= 10) {
      break;
    }
    users.map((user) => {
      if (user.username === tweets[i].username) {
        tenTweets.push({
          id: tweets[i].id,
          tweet: tweets[i].tweet,
          username: tweets[i].username,
          avatar: user.avatar,
        });
      }
    });
  }

  res.send(tenTweets);
});

app.get("/tweets/:username", (req, res) => {
  let { username } = req.params;

  const filterUser = tweets.filter((value) => value.username === username);

  let tweetsUsername = [];

  for (let i = filterUser.length - 1; i >= 0; i--) {
    users.map((user) => {
      if (user.username === filterUser[i].username) {
        tweetsUsername.push({
          id: filterUser[i].id,
          tweet: filterUser[i].tweet,
          username: filterUser[i].username,
          avatar: user.avatar,
        });
      }
    });
  }
  res.send(tweetsUsername);
});

app.listen(5000, () => {
  console.log("Listen on 5000");
});
