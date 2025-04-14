import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

//views
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true})); // chuyener data trong req.body -> js object
//public folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(userRouter);  

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


