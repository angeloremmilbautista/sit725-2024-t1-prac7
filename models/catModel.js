const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = "mongodb+srv://angeloremmilbautista:angelo12345@cluster0.meijlvf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    depreciationErrors: true,
  },
});

let collection;

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    collection = client.db("database1").collection("Cat");
  } catch (err) {
    console.error(err);
  }
};

const getAllCats = async () => {
  const cursor = collection.find();
  return await cursor.toArray();
};

const postCat = async (formData) => {
  await collection.insertOne(formData);
};

module.exports = { connectDB, getAllCats, postCat };
