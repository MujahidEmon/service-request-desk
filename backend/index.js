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
        const { search, status, priority, category, assignedPerson } =
          req.query;
        const filter = {};

        // search filter
        if (search) {
          const searchText = search.trim();

          if (searchText) {
            filter.$or = [
              {
                title: { $regex: searchText, $options: "i" },
              },
              {
                description: { $regex: searchText, $options: "i" },
              },
              {
                requesterName: { $regex: searchText, $options: "i" },
              },
            ];
          }
        }

        //filter by status
        if (status) {
          const statuses = [
            "Open",
            "In Progress",
            "Waiting for User",
            "Resolved",
            "Closed",
          ];

          if (!statuses.includes(status)) {
            return res.send(400).json({
              success: false,
              message: "invalid Status",
            });
          }

          filter.status = status;
        }

        // filter by priority
        if (priority) {
          const priorrities = ["Low", "Medium", "High", "Urgent"];
          if (!priorrities.includes(priority)) {
            return res.status(400).json({
              success: false,
              message: "Invalid priority",
            });
          }
          filter.priority = priority;
        }

        // filter by category
        if (category) {
          const categories = [
            "Hardware",
            "Software",
            "Access",
            "Network",
            "Other",
          ];

          if (!categories.includes(category)) {
            return res.status(400).json({
              success: false,
              message: "Invalid category",
            });
          }
          filter.category = category;
        }

        // filte by assigned person
        if (assignedPerson) {
          if (assignedPerson === "unassigned") {
            filter.assignedPerson = null;
          } else {
            const supportPeople = [
              { id: "hasan", name: "Hasan Mahmud" },
              { id: "nusrat", name: "Nusrat Jahan" },
              { id: "raihan", name: "Raihan Ahmed" },
              { id: "sadia", name: "Sadia Khan" },
            ];

            const person = supportPeople.find(
              (person) => person.id === assignedPerson,
            );

            if (!person) {
              return res.status(400).json({
                success: false,
                message: "Unknown support person",
              });
            }
            filter["assignedPerson.id"] = assignedPerson;
          }
        }

        // get req

        const requests = await reqCollection
          .find(filter)
          .sort({ updatedAt: -1 })
          .toArray();

        res.status(200).send(requests);
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to get requests",
        });
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
