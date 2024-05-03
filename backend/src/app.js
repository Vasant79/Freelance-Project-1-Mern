import express from "express";

const app = express();

app.use(express.json());

import userRouter from "./routes/user.routes.js";
import teamRouter from "./routes/team.routes.js";

app.use("/api/user", userRouter);
app.use("/api/team", teamRouter);

export default app;
