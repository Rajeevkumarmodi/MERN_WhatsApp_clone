import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/db.js";
import userRoute from "./routes/user.route.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

dbConnect();
app.use(express.json());
app.use("/api/v1/user", userRoute);

// app.get("/", (req, res) => {
//   res.status(200).send("<h1>Hello</h1>");
// });

app.listen(PORT, () => {
  console.log(`Server is running on PORT no :- ${PORT}`);
});
