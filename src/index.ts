import express,{json} from "express";
import httpStatus from "http-status";
require('express-async-errors');
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

 app.get("/health", (req, res) => {
     console.log("Hello world!");
     res.sendStatus(httpStatus.OK)
 });

export default app;