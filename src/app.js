const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");

const { MongoClientOptions } = require("mongodb");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/v3/app/events", (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017");
  async function run() {
    try {
      await client.connect();
      const dbs = client.db("intro");
      const coll = dbs.collection("quotes");
      const {
        type,
        uid,
        name,
        tagline,
        schedule,
        description,
        file,
        moderator,
        category,
        sub_category,
        rigor_rank,
        attendees,
      } = req.body;
      console.log(req.body);

      const rest = await coll.insertOne({
        type,
        uid,
        name,
        tagline,
        schedule,
        description,
        file,
        moderator,
        category,
        sub_category,
        rigor_rank,
        attendees,
      });
      res.end(JSON.stringify(rest));
    } catch (ex) {
      console.log("Error: " + ex);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
});
 app.get('/api/v3/app/events/:id', function (req, res) {

const client = new MongoClient("mongodb://localhost:27017");
async function run() {
  try {
    await client.connect();
    const dbs = client.db("intro");
    const coll = dbs.collection("quotes");
    const rest = await coll.findOne({ _id: ObjectId(req.params.id) });
    res.end(JSON.stringify(rest));
  } catch (ex) {
    console.log("Error: " + ex);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
});



app.put("/api/v3/app/events/:id", function (req, res) {
  // updating a data by it's ID and new value
  const client = new MongoClient("mongodb://localhost:27017");
  async function run() {
    try {
      await client.connect();
      const dbs = client.db("intro");
      const coll = dbs.collection("quotes");
      const rest = await coll.updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: { name: req.body.name, file: req.body.file } }
      );
      res.send(JSON.stringify(rest));
    } catch (ex) {
      console.log("Error: " + ex);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
});

app
  .delete("/api/v3/app/events/:id", function (req, res) {
    // updating a data by it's ID and new value
    const client = new MongoClient("mongodb://localhost:27017");
    async function run() {
      try {
        await client.connect();
        const dbs = client.db("intro");
        const coll = dbs.collection("quotes");
        const rest = await coll.deleteOne({ _id: ObjectId(req.params.id) });
        res.send("deleted doc succcesfully");
      } catch (ex) {
        console.log("Error: " + ex);
      } finally {
        await client.close();
      }
    }
    run().catch(console.dir);
  })
  .listen(3000, (err) => {
    if (err) throw err;
    console.log(`> localhost:3000`);
  });
