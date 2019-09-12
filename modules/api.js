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
            type: [Object],
        },
        schemes:{
            type: [String],
        },
        paths: {
            type: Object,
        },
        'x-customAuth': {
            name:{
                type:String
            } ,// "WSO2 APIM getway Acsess gearator"
            grantType:{
                type:String
            }, // client_credentias
            parameters:[{
                name:{
                    type:String
                }, // clientKey
                in:{
                    type:String
                }, // body
                required:{
                    type:Boolean
                }, //true
                type:{
                    type:String
                }, 
            }],
            url:{
                type: String
            }, //http://172.17.0.2:8280/token
            description:{
                type: String 
            }// "Genarates Accses token from client credentials to acsess data"
      },
    });

const Api =mongoose.model('api', ApiSchema);
module.exports = Api;