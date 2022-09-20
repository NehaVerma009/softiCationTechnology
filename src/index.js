const express = require('express');
var bodyParser = require('body-parser');
// const multer = require('multer')
const route = require('./routes/route')
const app = express();
const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://book-management:31VMJSSWSjcdoaAO@cluster0.eemzti8.mongodb.net/group48Database?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer().any()) 
app.use('/', route);

app.use(function(req,res){
    var err = new Error('Not Found.') 
    err.status = 400
    return res.status(400).send("Path not Found.")
  })
  
app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});


