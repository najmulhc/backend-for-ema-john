const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://admin:amiadmin@cluster0.fte9h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    await client.connect();
    const database = client.db("insertDB").collection("products");
    // create a document to insert
    app.get("/", async (req, res) => {
      console.log("client is asking for", req.query);
      const page = parseInt(req.query.page);
      const pageSize = parseInt(req.query.size);
    let result;
    const query = {};
      if(page || pageSize){
        result = await database.find(query).skip(page*pageSize).limit(pageSize).toArray();
      }
      else{
        result = await database.find(query).toArray();
      }

   
      
      res.send(result);
    });
    app.get("/product/count", async (req, res) => {
      const query = {};
      const items = database.find(query);
      const count = await items.count();
      res.send({ count });
      console.log("count sent from db");
    });
  } finally {
  }
};
run().catch(console.log);

app.listen(port, () => {
  console.log("server started");
});
