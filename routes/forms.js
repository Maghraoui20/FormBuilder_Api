const express = require('express');
const { CreateForm, allForms, FiltredForms, DeleteForm,FormByid, UpdateForm} = require('../controllers/form');



const router = express.Router();

router.post('/createForm',  CreateForm);
router.get('/getoneform/:id',  FormByid);

router.get('/getForms',  allForms);
router.get('/getFilterForms/:id',  FiltredForms);

router.delete('/:id',  DeleteForm);
router.put('/updateForm/:id',  UpdateForm);


module.exports = router;


