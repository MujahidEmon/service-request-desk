require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { dbConnect, getDatabase } = require("./src/config/db");
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


async function startServer() {
  try {
    await dbConnect();
    const reqCollection = await getDatabase().collection("requests");





    // get all requests
    app.get("/api/requests", async (req, res) => {
      try {
        const {search, status, priority, category, assignedPerson} = req.query;
        const filter = {}

        if(search){
            const searchText = search.trim();

            if(searchText){
                filter.$or = [
                    {
                        title: {$regex: searchText,
                            $options:"i"
                        }
                    },
                    {
                        description: {$regex: searchText, $options: "i"},
                        
                    },
                    {
                        requesterName: {$regex: searchText,
                            $options: "i"
                        }
                    }
                ]
            }
        }
        
        const requests = await reqCollection.find(filter).toArray();

        res.status(200).send(requests);

      } catch (error) {
        
      }
    });








    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Could not start server:", error.message);
    process.exit(1);
  }
}

startServer();
