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

  users.push({
    username,
    avatar,
    id: users.length + 1,
  });

  res.send("OK");
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

  tweets.push({
    username,
    tweet,
    id: tweets.length + 1,
  });

  res.send("OK");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/tweets", (req, res) => {
  res.send(tweets);
});

app.listen(5000, () => {
  console.log("Listen on 5000");
});
