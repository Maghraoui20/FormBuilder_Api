const express = require('express');
const { CreatePage , allPages, FormPages} = require('../controllers/pages');



const router = express.Router();

router.post('/createPage',  CreatePage);
router.get('/getPages',  allPages);
router.get('/getFormPages/:id',  FormPages);



module.exports = router;


