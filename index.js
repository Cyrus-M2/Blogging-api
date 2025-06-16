import express from 'express'

import {PrismaClient} from '@prisma/client';

const app = express()

const client = new PrismaClient()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("<h1>Welcome to My Blogging API</h1>")
})

// getting all users
app.get("/users", async (_req, res) => {
    try {
        const users = await client.user.findMany();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
});

//create users
app.post("/users", async (req, res) => {
    try {
        const {firstName, lastName, emailAddress, username} = req.body
        const newUser = await client.user.create ({
            data: {
                firstName,
                lastName,
                emailAddress,
                username
            }
        });
        res.status(201).json(newUser)
    } catch (e) {
        res.status(500).json({message: "Can't post user, something went wrong"})
    }
})

//specific user
app.get("/user/:id", async (req, res) => {
    try {
        const {id} = req.params
        const user = await client.user.findUnique({
            where: {id},
            include: {posts: true}
        });
        if (!user) {
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
});

// all posts
app.get("/post", async (req, res) => {
    try {
        const posts = await client.post.findMany({
            where: {isDeleted: false},
            include: {user: true}
        });
        res.status(200).json(posts);
    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
});

// creating a post
app.post("/post", async(req, res) => {
    try {
        const {title, content, userId} = req.body
        const newPost = await client.post.create({
            data: {
                title,
                content,
                userId
            }
        });
        res.status(201).json(newPost);
    } catch (e) {
        res.status(500).json({message: "Could not post, something went wrong !"})
    }
});

//specifc post
app.get("/post/:id", async (req, res) => {
    try {
        const {id} = req.params
        const post = await client.post.findUnique({
            where: {id},
            include: {user: true}
        });
        if (!post || post.isDeleted) {
            return res.status(404).json({message: "Post is not found"})
        }
        res.status(200).json(post);
    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
});

// updating a post
app.patch("/post/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {title, content} = req.body;
        const updatedPost = await client.post.update({
            where: {id},
            data: {
                title,
                content
            }
        });
        res.status(200).json(updatedPost);
    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
});

// deleting post
app.delete("/post/:id", async(req, res) => {
    try {
        await client.post.update({
            where: {id: req.params.id},
            data: {isDeleted: true}
        });
        res.status(200).json({message: "Your post was deleted successfully"});
    } catch (e) {
        res.status(500).json({message: "Something went wrong"});
    }
})


let port;
if (process.env.PORT) {
    port = process.env.PORT
} else {
    port = 10000;
}
app.listen(port, () => {
    console.log(`App running on port ${port}`);
})