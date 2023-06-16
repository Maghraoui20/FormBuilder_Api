const express = require('express');
const { CreateForm, allForms, DeleteForm,FormByid, UpdateForm} = require('../controllers/form');



const router = express.Router();

router.post('/createForm',  CreateForm);
router.get('/getoneform/:id',  FormByid);

router.get('/getForms',  allForms);

router.delete('/:id',  DeleteForm);
router.put('/updateForm/:id',  UpdateForm);


module.exports = router;


