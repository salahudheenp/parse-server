
const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const mongoose = require('mongoose');
import dotenv from 'dotenv'
import path from 'path';
const __dirname = path.resolve();



const app = express();
const server = new ParseServer({
    databaseURI: 'mongodb://localhost:27017/dev',
    cloud: __dirname + '/cloud/main.js',
    appId: 'myAppId',
    masterKey: 'myMasterKey',
    fileKey: 'optionalFileKey',
    serverURL: 'http://localhost:1337/parse'
});


// Start server
await server.start();

// Serve the Parse API on the /parse URL prefix
app.use('/employ', employRoutes);



mongoose.connect('mongodb://localhost:27017/dev', { useNewUrlParser: true });

mongoose.connection.once('open', () => {
    console.log('Connected to database');
});


const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
});