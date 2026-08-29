require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { dbConnect, getDatabase } = require("./src/config/db");
const { ObjectId } = require("mongodb");
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
    const counterCollection = getDatabase().collection("counters");


    
    // create requests
    app.post("/api/requests", async (req, res) => {
      try {
        const { title, description, requesterName, category, priority } =
          req.body;
        if (
          !title ||
          !description ||
          !requesterName ||
          !category ||
          !priority
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Title, description, requester name, category and priority are required",
          });
        }

        if (
          typeof title !== "string" ||
          typeof description !== "string" ||
          typeof requesterName !== "string"
        ) {
          return res.status(400).json({
            success: false,
            message: "Title, description and requester name must be text",
          });
        }

        const cleanTitle = title.trim();
        const cleanDescription = description.trim();
        const cleanRequesterName = requesterName.trim();

        if (cleanTitle.length < 3) {
          return res.status(400).json({
            success: false,
            message: "Title must be at least 3 characters long",
          });
        }

        if (cleanTitle.length > 100) {
          return res.status(400).json({
            success: false,
            message: "Title cannot be longer than 100 characters",
          });
        }

        if (cleanDescription.length < 10) {
          return res.status(400).json({
            success: false,
            message: "Description must be at least 10 characters long",
          });
        }

        if (cleanDescription.length > 2000) {
          return res.status(400).json({
            success: false,
            message: "Description cannot be longer than 2000 characters",
          });
        }

        if (cleanRequesterName.length < 2) {
          return res.status(400).json({
            success: false,
            message: "Requester name must be at least 2 characters long",
          });
        }

        if (cleanRequesterName.length > 100) {
          return res.status(400).json({
            success: false,
            message: "Requester name cannot be longer than 100 characters",
          });
        }

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

        const priorities = ["Low", "Medium", "High", "Urgent"];
        if (!priorities.includes(priority)) {
          return res.status(400).json({
            success: false,
            message: "Invalid priority",
          });
        }

        const currentYear = new Date().getFullYear();

        const counterResult = await counterCollection.findOneAndUpdate(
          {
            _id: `request-${currentYear}`,
          },
          {
            $inc: {
              sequence: 1,
            },
          },
          {
            upsert: true,
            returnDocument: "after",
          },
        );

        const sequence = counterResult.sequence;

        const requestNumber = `REQ-${currentYear}-${String(sequence).padStart(4, "0")}`;

        const newRequest = {
          requestNumber,  
          title: cleanTitle,
          description: cleanDescription,
          requesterName: cleanRequesterName,
          category: category,
          priority: priority,
          status: "Open",
          assignedPerson: null,
          internalNotes: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const result = await reqCollection.insertOne(newRequest);
        res.status(200).json({
          success: true,
          result: result,
          data: newRequest,
          message: "Request Created Successfully"
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Failed to create request",
        });
      }
    });


    
    // get all requests
    app.get("/api/requests", async (req, res) => {
      try {
        const { search, status, priority, category, assignedPerson } =
          req.query;
        const filter = {};
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page-1)*limit;
        const totalRequests = await reqCollection.countDocuments();

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
          .skip(skip)
          .limit(limit)
          .toArray();

          const totalPages = Math.ceil(totalRequests/limit)
          const totalFilteredRequests = await reqCollection.countDocuments(filter);

        res.status(200).json({
          success: true,
          data: requests,
          // count: requests.length,
          count: totalFilteredRequests,
          pagination: {
            currentPage: page,
            limit: limit,
            totalRequests: totalRequests,
            totalPages: totalPages
          }
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Failed to get requests",
        });
      }
    });

    // get single reqest

    app.get('/api/requests/:id', async(req, res) => {
      try {
        const {id} = req.params;

        if(!ObjectId.isValid(id)){
          return res.status(400).json({
            success:false,
            message:'invalid req id'
          })
        }

        const request = await reqCollection.findOne({_id: new ObjectId(id)})
        if(!request){
          return res.status(404).json({
            success:false,
            message:"request not found"
          })
        }

        res.status(200).send(request)

      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message:
            "Failed to get request"
        });
      }
    })


    // Update request
    app.patch('/api/requests/:id', async (req, res) => {
      try {
        const {id} = req.params;

        const {assignedPerson, status, priority} = req.body;

        if(!ObjectId.isValid(id)){
          return res.status(400).json({
            success:false,
            message: "Invalid Id"
          })

        }
        const request = await reqCollection.findOne({_id: new ObjectId(id)})

        if(!request){
          return res.status(404).json({
            success:false,
            message: 'Request not found'
          })
        }


        if(request.status === 'Closed'){
          return res.status(404).json({
            success:false,
            message: 'Request Already Closed'
          })
        }

        const updates = {}

        if(priority !== undefined){
          const priorities = ['High', 'Low', 'Medium', 'Urgent']

          if(!priorities.includes(priority)){  //validating priority
              return res.status(400).json({
              success:false,
              message:'Invalid Priority'
            })
          }

          updates.priority = priority;
        }




        if(status !== undefined){
          const statues = ['Open', 'In Progress', 'Waiting for User', 'Resolved', 'Closed']

          if(!statues.includes(status)){  //validating priority
            res.status(400).json({
              success:false,
              message:'Invalid Priority'
            })
          }

          if(status === 'Closed' && request.status !== "Resolved"){
            return res.status(400).json({
              success: false,
              message: 'Status must be resolved before it closed'
            })
          }


          updates.status = status;
        }


        if(assignedPerson !== undefined){
          if(assignedPerson === null){
            updates.assignedPerson = null;
          }

          else{
            const supportPeople = [
              { id: "hasan", name: "Hasan Mahmud" },
              { id: "nusrat", name: "Nusrat Jahan" },
              { id: "raihan", name: "Raihan Ahmed" },
              { id: "sadia", name: "Sadia Khan" },
            ];

            const person = supportPeople.find(person => person.id === assignedPerson);

            if(!person){
              return res.status(400).json({
                success: false,
                message: 'Invalid support person'
              })
            }

            updates.assignedPerson = {
              id: person.id,
              name: person.name
            }
          }
        }

        if(Object.keys(updates).length === 0){
          return res.status(400).json({
            success:false,
            message:'Nothing to Update'
          })
        }

        updates.updatedAt = new Date();

        const result = await reqCollection.updateOne(
          {_id: new ObjectId(id)},
          {
            $set: updates
          }
        )


        const updatedRequest = await reqCollection.findOne({_id: new ObjectId(id)})

        res.status(200).json({
          success:true,
          message: 'Updated Successfully',
          data: {result, updatedRequest}
        })


        
      } catch (error) {
         console.error(error);
          res.status(500).json({
          success: false,
          message:
            "Failed to update request"
        });

      }
    })


    // add notes

    app.post('/api/requests/:id/notes', async (req, res) => {
      try {
        const {id} = req.params;
        const {note} = req.body;

        if(!ObjectId.isValid(id)){
          return res.status(400).json({
            success:false,
            message: 'invalid id'
          })
        }

        if(!note || typeof note !== 'string' || !note.trim()){
          return res.status(400).json({
            success:false,
            message: 'empty notes'
          })
        }

        const cleanNote = note.trim();
        const request = await reqCollection.findOne({_id: new ObjectId(id)})

        if(!request){
          return res.status(400).json({
            success:false,
            message: 'request not found'
          })
        }

        if(request.status === 'Closed'){
          return res.status(400).json({
            success:false,
            message: 'Cannot add notes to closed request'
          })
        }

        const newNote = {
          _id: new ObjectId(),
          note: cleanNote,
          createdAt: new Date()
        }

        const result = await reqCollection.updateOne(
          {_id: new ObjectId(id)},
          {
            $push: {
              internalNotes: newNote
            },
            $set: {
              updatedAt: new Date()
            }
          }
        )

        res.status(200).json({
          success: true,
          message:'Internal notes added',
          data: result
        })

      } catch (error) {
        res.status(500).json({
        success: false,
        message:"Failed to add note"
      });
      }
    })


    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Could not start server:", error.message);
    process.exit(1);
  }
}

startServer();
