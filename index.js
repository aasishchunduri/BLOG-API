import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Aasish's Objective",
    content:"As a dedicated and innovative Software Engineer, my objective is to leverage my strong foundation in computer science and my passion for crafting efficient and user-centric solutions. With a proven ability to adapt to evolving technologies and a keen eye for detail, I am driven to contribute my expertise to designing and developing cutting-edge software applications. I aspire to collaborate with diverse teams to tackle complex challenges, continuously learn, and create impactful software that enhances user experiences and drives technological advancement.",
    author: "Aasish Chunduri",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Aasish Chunduri: Unleashing Creativity in Code",
    content:"Meet Aasish Chunduri, a coding enthusiast skilled in languages like Java and Python, crafting seamless digital experiences with tools like React.js and Node.js. Aasish's journey includes optimizing integrations at Tata Consultancy Services, enhancing efficiency by 75%, and conjuring deployments with AWS, Docker, and Kubernetes. Connect with him at aasish.chunduri2@gmail.com or +1(980)-382-0028 to embark on coding adventures together and weave technological magic",
    author: "Aasish Chunduri",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "My Hobbies",
    content:"I have a passion for sports and entertainment. Cricket is my true love, and I shine as a batting all-rounder on the field. When I'm not on the cricket pitch, I'm smashing shuttlecocks on the badminton court. And after an exhilarating match, you'll often find me immersed in the world of movies, where I enjoy exploring diverse genres and narratives",
    author: "Aasish",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
