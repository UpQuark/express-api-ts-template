import express from "express";
import path from "path";
import riskRouter from "./routes/risk";
import logger from "morgan";

const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/risk', riskRouter);

export default app;
