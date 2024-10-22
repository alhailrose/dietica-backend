import express from "express";
import authRoutes from "./routes/authRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";
import log from "./middleware/log.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(log);

app.use(authRoutes);

app.get("/", (req, res) => {
  res.send("Hello this is Dietica API");
});

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({ error: { status, message } });
});

//port
const port = process.env.PORT || 3000;
app.listen(`${port}`, () => {
  console.log(`Server running on port ${port}`);
});
