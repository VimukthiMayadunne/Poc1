const mongoose =require('mongoose');
const Schema =mongoose.Schema;


let FileSchema = new Schema({
    files:{
        name:{
        type: String,
    },
    data: {
        type: Buffer,
    }
}
});

const File =mongoose.model('file',FileSchema);
module.exports = File;