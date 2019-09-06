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
            type: Object,
        },
        paths: {
            type: Object,
      }
});

const Api =mongoose.model('api', ApiSchema);
module.exports = Api;