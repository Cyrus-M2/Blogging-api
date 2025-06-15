import express from 'express'

import {PrismaClient} from '@prisma/client';

const app = express()

const client = new PrismaClient()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("<h1>Welcome to My Blogging API</h1>")
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