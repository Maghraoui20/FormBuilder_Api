const SubmitForm = require('../models/submittedForm');

exports.CreateSubmitForm =async (req, res) => {
   


         try {
           
        
            const submitForm = new SubmitForm(req.body);
        
            const saved_submitform = await submitForm.save(submitForm);
            if (!saved_submitform) {
              return res.status(500).send({
                message: "Some error occurred while creating the Intership.",
              });
            }
            return res.status(200).send(saved_submitform);
          } catch (err) {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Intership.",
            });
          }
       
       
   }