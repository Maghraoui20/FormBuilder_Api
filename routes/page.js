const express = require('express');
const { CreatePage , allPages, FormPages, FiltredPage, DeletePage, PageByid, UpdatePage} = require('../controllers/pages');



const router = express.Router();

router.post('/createPage',  CreatePage);
router.get('/getPages',  allPages);
router.get('/getFormPages/:id',  FormPages);
router.get('/getFiltredPages/:id',  FiltredPage);
router.delete('/:id',  DeletePage);

router.put('/updatePage/:id',  UpdatePage);
router.get('/getonePage/:id',  PageByid);



module.exports = router;


