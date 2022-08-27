import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let users = [
  {
    id: 1,
    username: "bobesponja",
    avatar:
      "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
  },
  {
    id: 2,
    username: "dog",
    avatar:
      "https://super.abril.com.br/wp-content/uploads/2018/05/filhotes-de-cachorro-alcanc3a7am-o-c3a1pice-de-fofura-com-8-semanas1.png?w=1024",
  },
];

let tweets = [
  {
    id: 1,
    username: "bobesponja",
    tweet: "eu amo o hub",
  },
  {
    id: 2,
    username: "dog",
    tweet: "au au au",
  },
];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  users.push({
    username,
    avatar,
    id: users.length + 1,
  });

  res.status(201).send("OK");
});

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
  let tenTweets = [];

  for (let i = tweets.length - 1; i >= 0; i--) {
    if (tenTweets.length >= 10) {
      break;
    }
    const avatarUser = users.map((user) => {
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

app.listen(5000, () => {
  console.log("Listen on 5000");
});
