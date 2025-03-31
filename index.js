import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.get('', (req, res) => {
    res.send("Hello World!");
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
// Middleware to parse JSON bodies
app.use(userRouter);


