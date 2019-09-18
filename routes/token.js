const express = require('express');
const router =express.Router();
var Base64 = require('js-base64').Base64;
var request = require("request");

router.get('/awa', (req, res) => {
    res.send('Welcome to the express server');
});

router.post('/token',function(req,res){
    var body1 =req.body
    let token =decode(body1.ck,body1.cs)
    var options = { 
    method: 'POST',
    url: 'http://172.17.0.2:8280/token',
    headers: {
       'cache-control': 'no-cache',
        Authorization: token },
    form: { 
        grant_type: body1.grantType,
        username:body1.username,
        password:body1.password,
        undefined: undefined } 
    }

    request(options, function (error, response, body) {
        if (error)
            console.log(error)
        console.log(body)
    res.status(200).send(body)
    })
})


router.post('/token1',function(req,res){
    var head=req.headers
    console.log("Body:",req.body)
    var str1=req.body.ck
    var str2=req.body.cs
    var str3=decode(str1,str2)
    var options = { method: 'POST',
    url: 'http://172.17.0.2:8280/token',
    headers: 
    { //'Postman-Token': '48f678cf-3db9-493d-9490-815de5c76882',
      'cache-control': 'no-cache',
    Authorization: str3 },
    form: { grant_type: "client_credentials" } }

    request(options, function (error, response, body) {
        if (error) 
            console.log(error)
    console.log(body)
    res.status(200).send(body)
    })
})

function decode(ck,cs){
    console.log("Fcalled")
    var str1 = ck;
    var str2 = cs;
    var str3 = str1+":"+str2;
    console.log("CK:",str1)
    console.log("CK:",str2)
// Encode the String
    var encodedString = Base64.encode(str3)
    console.log("Encoded:",encodedString);
    return  "Basic "+encodedString;
}

module.exports =router;