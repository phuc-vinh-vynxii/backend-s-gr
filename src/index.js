import express from "express";
import dotenv from "dotenv";
import methodOverride from "method-override";
import router from "./routes/index.route.js";
import instanceMongoDB from "./config/db.config.js";

const app = express();
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
dotenv.config();
instanceMongoDB.connect();
const port = process.env.PORT;
router(app);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
