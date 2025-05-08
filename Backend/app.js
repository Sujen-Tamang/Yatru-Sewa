import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import routes from './routes/index.js';


export const app = express();

dotenv.config();

connectDB().catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
});

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1', routes)


app.use(errorMiddleware);

