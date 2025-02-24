const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");

const FactoryRouter = require("./routers/FactoryRouter");

const app = express();
const PORT = 3000;

connectDB();

app.use(cors());

app.use(express.json());

app.use("/Factory", FactoryRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
