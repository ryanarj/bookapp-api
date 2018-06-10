import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import auth from './routes/auth';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// To use the .env variables
dotenv.config();
const app = express();
const uri = process.env.MONGODB_URL;
app.use(bodyParser.json());

// Connection to the DB
mongoose.connect(uri).catch(err => {})

app.use('/api/auth', auth);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.listen(8080, () => console.log('running on 8080'));