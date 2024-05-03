import mongoose from "mongoose";

export default async function dbConnection() {
  try {
    const con = await mongoose.connect(process.env.URL);
    return con;
  } catch (error) {
    console.log("Connection to db failled : ", error);
  }
}
