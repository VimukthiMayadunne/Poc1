var Base64 = require('js-base64').Base64;
let express = require('express');
const fileUpload = require('express-fileupload');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
const connectDB = mongoose.connect(config.database, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('-------------------------------');
        console.log("Warning! Database not connected");
    } else {
        console.log("Database connected");
    }
});
let conn = mongoose.connection;
let port = 3000;
const Basic = require('./modules/basic');
const Api = require('./modules/api');
const File = require('./modules/file');
var request = require("request");
// Setting up the root route
app.get('/', (req, res) => {
    res.send('Welcome to the express server');
});

// Allows cross-origin domains to access this API
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.append('Access-Control-Allow-Credentials', true);
    next();
});

// BodyParser middleware
app.use(bodyParser.json());
app.use(fileUpload())

app.use('/token', require('./routes/token'));
// ----------------------------------------------------------Basic API details ----------------------------------------------
app.post('/addbasic', function(req, res) {
    let basic = new Basic(req.body);
    console.log(basic);
    basic.save()
        .then(issue => {
            res.status(200).json({ 'issue': 'Added successfully' });
            //res.status(200).json(city);
        })
        .catch(err => {
            console.log(err)
            res.status(400).send('Failed to create new record');
        });
});

app.route('/getbasic').get((req, res) => {
    let array = []
    Api.find((err, item) => {
        if (err)
            console.log(err);
        else {
            for (var i in item) {
                //console.log(item[i])
                var basic = {
                    Name: item[i].info.title,
                    Host: item[i].host,
                    Catogery: item[i].info.contact.email,
                    Version: item[i].info.version
                }
                array.push(basic)
                console.log(basic)
            }
            //console.log(JSON.stringify(array))
            res.json(array);
        }
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
app.post('/addapi', function(req, res) {
    //console.log(req.body)
    let api = new Api(req.body);
    console.log("file details", api);
    api.save()
        .then(issue => {
            res.status(200).json({ 'issue': 'Added successfully' });
        })
        .catch(err => {
            console.log(err)
            res.status(400).send('Failed to create new record');
        });
});
app.post('/addswg', function(req, res) {
    console.log(req.files)
    let file = new File(req.files)
    console.log(file)
    file.save()
        .then(issue => {
            res.status(200).json({ 'issue': 'Added successfully' });
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
})
app.post('/getdetails', function(req, res) {
    console.log("Details Requseted")
    let apidetails = req.body
    Api.findOne({ 'host': apidetails.host }).exec((err, feed) => {
        if (err)
            console.log(err)
        else
            res.json(feed)
    });
});
app.route('/getswg').get((req, res) => {
    File.find((err, item) => {
        if (err)
            console.log(err);
        else
            res.json(item);
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

app.post('/up', function(req, res) {
    console.log(req.body)
    console.log(req.body.files)
    console.log(req.file.tFile)
    console.log(req.files)
    res.status(200).json("File Recived")
})

app.post('/upload', function(req, res) {
    console.log("Files", req.files);
    console.log("File:", req.file)
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }

    console.log(req.file)
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.tFile;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('./somewhere/on/your/server/filename.json', function(err) {
        if (err)
            return res.status(500).send(err);
        res.send('File uploaded!');
    });
});

// ----------------------------------------------------------Authentication   details ----------------------------------------------


app.post('/token', function(req, res) {
    var head = req.headers
    var body1 = req.body
    var options = {
        method: 'POST',
        url: 'http://172.17.0.2:8280/token',
        headers: { //'Postman-Token': '14224842-9cbb-4917-9856-9da7dac4c0bb',
            'cache-control': 'no-cache',
            Authorization: 'Basic ZjFVSmwzSmRBTEFtNXhLdEI5SUhLQkhDQmlrYTppZmhCdTE0SkkxdFdpckE0dU9fUEE0M0Y0V3Nh'
        },

        form: {
            grant_type: "password",
            username: body1.username,
            password: body1.password,
            undefined: undefined
        }
    }
    request(options, function(error, response, body) {
        if (error)
            console.log(error)
        console.log(body)
        res.status(200).send(body)
    })
})


app.post('/token1', function(req, res) {
    var head = req.headers
    var str1 = req.body.ck
    var str2 = req.body.cs
    var str3 = decode(str1, str2)
    var options = {
        method: 'POST',
        url: 'http://172.17.0.2:8280/token',
        headers: {
            'cache-control': 'no-cache',
            Authorization: str3
        },
        form: { grant_type: "client_credentials" }
    }

    request(options, function(error, response, body) {
        if (error)
            console.log(error)
        console.log(body)
        res.status(200).send(body)
    })
})

app.listen(port, (req, res) => {
    console.log("Server started on port: " + port);
});

function decode(ck, cs) {
    console.log("Fcalled")
    var str1 = ck;
    var str2 = cs;
    var str3 = str1 + ":" + str2;
    // Encode the String
    var encodedString = Base64.encode(str3)
    console.log(encodedString); // aGVsbG86d29ybGQhPyQqJigpJy09QH4=
    return "Basic " + encodedString;
}