import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import auth from './routes/auth';
import bodyParser from 'body-parser';

const app = express();
const uri = "mongodb://mongo:27017/bookapp";
const options = {
    useMongoClient: true,
    // autoIndex: false, // Don't build indexes
    // reconnectTries: 100, // Never stop trying to reconnect
    // reconnectInterval: 500, // Reconnect every 500ms
    // poolSize: 10, // Maintain up to 10 socket connections
    // // If not connected, return errors immediately rather than waiting for reconnect
    // bufferMaxEntries: 0
  };
app.use(bodyParser.json());
mongoose.connect(uri).catch(err => {})

app.use('/api/auth', auth);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.listen(8080, () => console.log('runing on 8080'));