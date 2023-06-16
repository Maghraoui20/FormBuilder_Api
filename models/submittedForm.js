const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const submittedformSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    formSubmissions: [
        {
            nameInput: String,
            valueInput: String
        }
    ],
    page: {
        type: ObjectId,
        ref: 'Page'
    },
    form: {
        type: ObjectId,
        ref: 'Form'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
  
});

module.exports = mongoose.model('Submittedform', submittedformSchema);
