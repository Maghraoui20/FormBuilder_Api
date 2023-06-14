const express = require('express');
const { CreateSubmitForm} = require('../controllers/submittedForm');



const router = express.Router();

router.post('/createSubmitForm',  CreateSubmitForm);


module.exports = router;


