const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())

// MONGODB 


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.5urggkk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {

        const allUsersCollection = client.db('coming_soon_page').collection('usersCollection')

        // users data inserted into DB
        app.post('/sendemail', async (req, res) => {
            try {
                const user = req.body;
                const result = await allUsersCollection.insertOne(user);
                res.send({ success: true, message: 'Data inserted successfully.', data: result });
            } catch (err) {
                res.send({ success: false, message: 'Something went wrong. Please try again.', error: err });
            }
        })

    }
    finally {

    }
}
run().catch(console.log())





app.get('/', (req, res) => {
    res.send('Coming soon web app server ')
})

app.listen(port, () => {
    console.log(`Coming soon web app  running on ${port}`)
})