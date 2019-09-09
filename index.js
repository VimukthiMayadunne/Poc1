let express = require('express');
var htmlToJson = require('./node_modules/html-to-json');
let app = express(); 
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const config = require('./config/database');
const connectDB = mongoose.connect(config.database, { useNewUrlParser: true },(err)=>{
    if(err){
      console.log('-------------------------------');  
      console.log("Warning! Database not connected");
    }else{
      console.log("Database connected"); 
    }
});
let conn = mongoose.connection;
let port = 3000;
const Basic=require('./modules/basic');
const Api=require('./modules/api');
var request = require("request");
// Setting up the root route
app.get('/', (req, res) => {
    res.send('Welcome to the express server');
});

// Allows cross-origin domains to access this API
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin' , 'http://localhost:4200');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.append('Access-Control-Allow-Credentials', true);
    next();
});

// BodyParser middleware
app.use(bodyParser.json());


// ----------------------------------------------------------Basic API details ----------------------------------------------
app.post('/addbasic',function(req,res){
    let  basic = new Basic(req.body);
    console.log(basic);
    basic.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added successfully'});
            //res.status(200).json(city);
        })
        .catch(err => {
            console.log(err)
            res.status(400).send('Failed to create new record');
        });
});

app.route('/getbasic').get((req, res) => {
    Basic.find((err, item) => {
        if (err)
            console.log(err);
        else
            res.json(item);
    });
});

app.route('/getbasic/:id').get((req, res) => {
    Basic.findById(req.params.id, (err, item) => {
        if (err)
            console.log(err);
        else
            res.json(item);
    });
});



// ----------------------------------------------------------Swagger  details ----------------------------------------------

app.post('/addapi',function(req,res){
    let  api = new Api(req.body);
    console.log(api);
    api.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

app.post('/getdetails',function(req,res){
    console.log("Details Requseted")
    let  apidetails = req.body
    console.log(apidetails)
    Api.find({'host': apidetails.host}).exec((err, feed) => {
        console.log(feed)
        if (err)
            console.log(err)
        else
            res.json(feed)
    });
});

app.route('/getapi').get((req, res) => {
    Api.find((err, item) => {
        if (err)
            console.log(err);
        else
            res.json(item);
    });
});

app.route('/getapi/:id').get((req, res) => {
    Api.findById(req.params.id, (err, item) => {
        if (err)
            console.log(err);
        else
            res.json(item);
    });
});

// ----------------------------------------------------------Authentication   details ----------------------------------------------


app.post('/token',function(req,res){
    var head =req.headers
    var body1 =req.body
    var options = { method: 'POST',
    url: 'http://172.17.0.2:8280/token',
    headers: 
     { 'Postman-Token': '14224842-9cbb-4917-9856-9da7dac4c0bb',
       'cache-control': 'no-cache',
       Authorization: 'Basic ZjFVSmwzSmRBTEFtNXhLdEI5SUhLQkhDQmlrYTppZmhCdTE0SkkxdFdpckE0dU9fUEE0M0Y0V3Nh' },
    form: 
     { grant_type: "password",
       username: body1.username,
       password: body1.password,
       undefined: undefined } }
    request(options, function (error, response, body) {
        if (error)
            console.log(error)
        console.log(body)
    res.status(200).send(body)
    })
})


app.post('/token1',function(req,res){
    var head=req.headers
    var bodyc=req.body.cs
    var options = { method: 'POST',
    url: 'http://172.17.0.2:8280/token',
    headers: 
    { 'Postman-Token': '48f678cf-3db9-493d-9490-815de5c76882',
      'cache-control': 'no-cache',
       Authorization: bodyc },
    form: { grant_type: 'client_credentials' } }

    request(options, function (error, response, body) {
        if (error) 
            console.log(error)
    console.log(body)
    res.status(200).send(body)
    })
})

app.listen(port, (req, res) => {
    console.log("Server started on port: " + port);
});