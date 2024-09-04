import express from 'express';
import mongoose from 'mongoose';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import typeDefs from '../models/entriesGQL';
import resolvers from '../models/resolversGQL';

require('dotenv').config();

const app = express();

app.use(express.json());

//
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

app.get('/', (_req, res) => {
    res.send('Checking')
})


const server = new ApolloServer({
    typeDefs,
    resolvers
})

const PORT = parseInt(process.env.PORT!);

startStandaloneServer(server, {
    listen: { port:  PORT},
    
}).then( ({url}) => {
    console.log(`Server ready at ${url}`)
})


// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// })