const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
app = express()

app.use(cors());
app.use(express.json());
require('dotenv').config();


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.disah5t.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const categoriesCollection = client.db('carWorld').collection('categories');
        const productsCollection = client.db('carWorld').collection('products');
        const usersCollection = client.db('carWorld').collection('usersInfo');
        const bookingCollection = client.db('carWorld').collection('booking-products');
        const usersInfoCollection = client.db('carWorld').collection('usersInfo')

        app.get('/categories', async (req, res) => {
            const query = {};
            const cursor = categoriesCollection.find(query);
            const categories = await cursor.toArray();
            res.send(categories);
        })

        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { category_id: id };
            const cursor = productsCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })

        app.post('/users', (req, res) => {
            const user = req.body;
            // console.log(user);
            const result = usersCollection.insertOne(user);
            res.send(result);
        })

        app.get('/usersInfo', async (req, res) => {
            const email = req.query.email;
            // console.log(email)
            const query = { email: email };
            const usersInfo = await usersCollection.findOne(query);
            res.send(usersInfo);
        })

        app.get('/booking_products', async (req, res) => {
            const email = req.query.email;
            console.log(email)
            const query = { email: email };
            const myProducts = await bookingCollection.find(query).toArray();
            res.send(myProducts);
        })

        app.post('/booking_products', (req, res) => {
            const product = req.body;
            const result = bookingCollection.insertOne(product);
            res.send(result);

        })
    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Recycle web node server is running!');
})

app.listen(port, () => {
    console.log(`Recycle web node server running on port: ${port}`);
})