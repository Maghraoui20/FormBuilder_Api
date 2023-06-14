const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    inputs: [
        {
            label:{type:String},
            name:{type:String},
            type:{type:String}
        }
        
    ],
  
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
  
});

module.exports = mongoose.model('Form', formSchema);
