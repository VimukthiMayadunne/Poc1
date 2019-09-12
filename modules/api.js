const mongoose =require('mongoose');
const Schema =mongoose.Schema;


let ApiSchema = new Schema({
        swagger: {
            type: Number,
        },
        info: {
            type: Object,
        },
        host:{
            type: String,
        },
        basePath: {
            type: String,
        },
        tags: {
            type: Object,
        },
        schemes:{
            type: [String],
        },
        paths: {
            type: Object,
        customAuth:{
            name:String ,// "WSO2 APIM getway Acsess gearator"
            grantType:String, // client_credentias
            parameters:[{
                name:String, // clientKey
                in:String, // body
                required:Boolean, //true
                type:String // string
            }],
            url:String, //http://172.17.0.2:8280/token
            description:String // "Genarates Accses token from client credentials to acsess data"
      }
    }
});

const Api =mongoose.model('api', ApiSchema);
module.exports = Api;