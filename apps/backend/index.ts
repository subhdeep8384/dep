import { prisma } from "db/client";
import express from "express";
import 'dotenv/config'


const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("testing route");
})

app.get("/user", async (req, res) => {
    const users = await prisma.user.findMany();
    return res.json(users);
})

app.post("/user", async (req, res) => {
    const userExists = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const userCreated = await prisma.user.create({
        data: {
            username: req.body.username,
            password: req.body.password
        }
    })

    return res.json(userCreated);
})

app.get("/todo", async (req, res) => {
    const todos = await prisma.todo.findMany();
    return res.json(todos);
})

app.post("/todo", async (req, res) => {
    const todo = await prisma.todo.create({
        data: {
            title: req.body.title,
            description: req.body.description,
            done: req.body.done,
            userId: req.body.userId
        }
    })
    return res.json(todo);
})

app.listen(3001, () => {
    console.log("Server started on port 3001");
})