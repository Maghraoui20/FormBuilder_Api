const express = require('express');
const { CreateForm, allForms} = require('../controllers/form');



const router = express.Router();

router.post('/createForm',  CreateForm);
router.get('/getForms',  allForms);


module.exports = router;


