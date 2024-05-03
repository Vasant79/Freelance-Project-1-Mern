import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import dbConnection from "./database/dbConnection.js";
import { populateMockData } from "./utils/populateMockData.utils.js";

const PORT = process.env.PORT || 3000;

dbConnection()
  .then((val) => {
    console.log("db connected ");
    app.listen(PORT, console.log("server listening on port : ", PORT));
  })
  .catch((error) => console.log(error));

populateMockData().then((response) =>
  console.log("data populated : ", response)
);
