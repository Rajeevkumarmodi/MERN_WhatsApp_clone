import express from "express";

const PORT = 8990;

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT no :- ${PORT}`);
});
