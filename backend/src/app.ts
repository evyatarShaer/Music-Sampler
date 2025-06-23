import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./database/connecetToDB";
import userRouter from './routes/userRoute';
import managerRouter from './routes/managerRoute';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3000;

connectToDB();

app.use('/app', userRouter);
app.use('/manager', managerRouter);

// Error handling middleware

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});