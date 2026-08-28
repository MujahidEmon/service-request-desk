require("dotenv").config();


const express = require("express");
const cors = require("cors");
const {dbConnect} = require("./src/config/db");
const port = process.env.PORT || 5000;



const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);





app.get("/", (req, res) => {
  res.send("srd server is running");
});

app.listen(port, () => {
  console.log(`srd server is running on port ${port}`);
});


async function startServer() {
  try {
    await dbConnect();

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Could not start server:", error.message);
    process.exit(1);
  }
}

startServer();
