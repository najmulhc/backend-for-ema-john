const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require("cors");
const port = 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://admin:amiadmin@cluster0.fte9h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async() => {
    try{
        await client.connect();
        const database = client.db("insertDB");
    const haiku = database.collection("haiku");
    // create a document to insert
    const doc = {
      title: "Record of a Shriveled Datum",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    }
    const result = await haiku.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    }
    finally{

    }
}
run().catch(console.log);

app.get("/", (req, res) => {
    res.send("first data from the server ")
});

app.listen(port, ()=> {
    console.log("server started");
})