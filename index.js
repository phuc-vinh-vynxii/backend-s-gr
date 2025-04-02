import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
// Middleware to parse JSON bodies
app.use(userRouter);


