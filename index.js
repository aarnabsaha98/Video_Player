const express = require('express');
const router = require('./routers/index');
const connectDB = require('./mongoConnection/mongo')
require('dotenv').config();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const app = express();

// This will handle the request/response json types
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//testing purposes
app.get('/' , (req,res) =>{
    res.send('Hello World!');
});

app.use('/api' ,router);

const start  = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT , console.log(`server is running ${PORT}`));

    }
    catch(err){
        console.log(err);
    }
}

start()
