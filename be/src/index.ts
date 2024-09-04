import express from 'express';
import mongoose from 'mongoose';

require('dotenv').config();

const app = express();

app.use(express.json());


mongoose.set('strictQuery', false);

const MONGODB_URI = process.env.MONGODB_URI!;
console.log('connection to', MONGODB_URI);

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB', error.message)
    })

app.get('/', (req, res) => {
    res.send('Checking')
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})