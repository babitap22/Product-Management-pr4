const express = require('express');
const mongoose = require('mongoose');
const route = require('./route/route')
const app = express();
const multer=require('multer')

app.use(express.json());

app.use(multer().any())


app.use((err, req, res, next) => {
  if (err.message === "Unexpected end of JSON input") {
    return res.status(400).send({status: false, message: "ERROR Parsing Data, Please Provide a Valid JSON",});
  } else {
    next();
  }
});
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://babita22:OMfxi9OMMatDigrx@cluster0.h2k60of.mongodb.net/project5', { useNewUrlParser: true })
  .then(() => console.log('MongoDb is connected'))
  .catch(err => console.log(err));

app.use('/', route)

app.use((req, res) => {
  res.status(400).send({ status: false, message: 'Invalid URL' })
})

app.listen( 3000, () => console.log('Express app is running on port 3000'));

//userUpdate - 1-testCase