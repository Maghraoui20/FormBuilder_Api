const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const pageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
   
    description: {
        type: String,
        required: true
    },
  
    formName:{
        type: ObjectId,
        ref: 'Form'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
  
});

module.exports = mongoose.model('Page', pageSchema);
