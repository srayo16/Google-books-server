const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q2g4k.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        console.log('DB Connected');
        const database = client.db("Quries").collection("ListThese");

        app.post('/data', async (req, res) => {
            const query = req.body;
            const result = await database.insertOne(query);
            res.send(result);

        })
        app.get('/data', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const data = await database.find(query).toArray();
            res.send(data);
        })

        app.get('/alldata', async (req, res) => {
            const data = await database.find().toArray();
            res.send(data);
        })



    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);















app.get('/', (req, res) => {
    res.send('Server is running');
})
app.listen(port, () => {
    console.log('Listening to port', port);
})