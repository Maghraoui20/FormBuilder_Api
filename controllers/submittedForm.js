var mongoose = require('mongoose');
const SubmitForm = require('../models/submittedForm');
const moment= require("moment");
exports.CreateSubmitForm =async (req, res) => {
   


         try {
           
        
            const submitForm = new SubmitForm(req.body);
        
            const saved_submitform = await submitForm.save(submitForm);
            if (!saved_submitform) {
              return res.status(500).send({
                message: "Some error occurred ",
              });
            }
            return res.status(200).send(saved_submitform);
          } catch (err) {
            res.status(500).send({
              message:
                err.message || "Some error occurred ",
            });
          }
       
       
   }
   exports.getUsersSubmission= async(req, res)=>{
    try{
const users = await SubmitForm.find({}, {"_id":0}).select('user formSubmissions created form').populate('user');

return res.status(200).json(users);


    }catch(err){
      res.status(500).send({
        message:
          err.message || "Some error occurred ",
      });
    }
   }

   let currentDate = new Date().toISOString();


   exports.getFileterubmission =async (req, res) => {
    try {
     
      console.log(req.query, "body");
      const matchFormId = req.query.formId
  ? { 'form': mongoose.Types.ObjectId(req.query.formId) }
  : { 'form': { $exists: true } };

  const matchPageId = req.query.pageId
  ? { 'page': mongoose.Types.ObjectId(req.query.pageId) }
  : { 'page': { $exists: true } };

const matchCreated = {
  created: {
    $gte: req.query.date ? new Date(req.query.date) : new Date('1900-01-01')
  }
};

const query = {
  $and: [matchPageId, matchFormId, matchCreated]
};

const submissionform = await SubmitForm.find(query).populate('user');
      // const submissionform = await SubmitForm.find({created : {$gte :new Date(req.query.date)}}).select('user formSubmissions created').populate('user');
      console.log("submissionform", submissionform);

      res.status(200).json(submissionform);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
  
  };