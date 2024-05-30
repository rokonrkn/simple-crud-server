const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 7000;

// middleWare
app.use(cors());
app.use(express.json());

// 4TkYNnaBFV8aknLk shohel123 

const uri = "mongodb+srv://shohel123:4TkYNnaBFV8aknLk@cluster0.5aqejnk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,                         
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    const database = client.db("insertDB");
    const haiku = database.collection("users");

    app.get('/users', async(req, res) =>{
      const cursor = haiku.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.post("/users", async(req, res) => {
      const userData = req.body;
      const result = await haiku.insertOne(userData);
      res.send(result);
      console.log(userData);
    });

    app.delete('/users/:id', async(req, res) =>{
      const id = req.params.id;
      console.log(id)
      const query = {_id: ObjectId(id)}
      const result = await haiku.deleteOne(query)
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
}
run();

app.get("/", (req, res) => {
  res.send("user curd server side is running");
});

app.listen(port);