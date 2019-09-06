const mongoose =require('mongoose');
const Schema =mongoose.Schema;


let BasicSchema = new Schema({
    Name:{
        type: String,
    },
    Host: {
        type: String,
    },
    Catogery:{
        type: String,
    },
    Version:{
        type: Number
    }
});

const Basic =mongoose.model('city',BasicSchema);
module.exports = Basic;