import express,{json} from "express";
import httpStatus from "http-status";
require('express-async-errors');
import cors from "cors";
import errorMiddleware from './middleware/error.middleware';
import participantsRouter from './router/participant.router';
import gamesRouter from './router/games.router';
import betsRouter from './router/bets.router';

const app = express();
app.use(cors());
app.use(json());

 app.get("/health", (req, res) => {
     console.log("Hello world!");
     res.sendStatus(httpStatus.OK)
 });
app.use(participantsRouter);
app.use(gamesRouter);
app.use(betsRouter);
app.use(errorMiddleware);

export default app;