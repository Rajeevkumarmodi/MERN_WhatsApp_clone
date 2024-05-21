import mongoose from "mongoose";

function dbConnect() {
  try {
    mongoose.connect(process.env.DBURL);
    console.log("db connect successfull");
  } catch (error) {
    console.log("error", error);
  }
}

export default dbConnect;
