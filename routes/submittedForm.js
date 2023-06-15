const express = require('express');
const { CreateSubmitForm, getUsersSubmission,getFileterubmission} = require('../controllers/submittedForm');



const router = express.Router();

router.post('/createSubmitForm',  CreateSubmitForm);
router.get('/getusersSubmission',  getUsersSubmission);
router.get('/getFilterDate',  getFileterubmission);


module.exports = router;


