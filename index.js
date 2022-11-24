const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
app = express()

app.use(cors());
app.use(express.json());
require('dotenv').config();


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.disah5t.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/', (req, res) => {
    res.send('Recycle web node server is running!');
})

app.listen(port, () => {
    console.log(`Recycle web node server running on port: ${port}`);
})