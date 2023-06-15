const Form = require('../models/forms');
const SubmitForm = require('../models/submittedForm');


exports.allForms =async (req, res) => {
    try {
        const forms = await Form.find();
    console.log(forms);
        res.status(200).json(forms);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }

};
exports.FormByid =async (req, res) => {
  try {
      const forms = await Form.findById(req.params.id);
  console.log(forms);
      res.status(200).json(forms);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }

};
exports.CreateForm = async(req, res) => {
    const form =  new Form();
    form.name=req.body.name
    for(i=0;i<req.body.inputs.length;i++){
    form.inputs[i]=req.body.inputs[i]

}

const savedForm= await form.save();
console.log(savedForm)
  
      res.status(200).json(savedForm) 
}

exports.FiltredForms =async (req, res) => {
  try {
    const id=req.params.id;
    console.log(id,"idpage");
    let tabsId ="";
    let form = await Form.findById(id).select('_id');
    console.log(form);
    tabsId = form._id;

    const submissionform = await SubmitForm.find({form :  tabsId}).select('user formSubmissions created').populate('user');
      res.status(200).json(submissionform);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }

};

exports.DeleteForm = async(req, res) => {
  const id=req.params.id;

  Form.findByIdAndRemove(id)
  .then((data) => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete form with id=${id}. Maybe form was not found!`,
      });
    } else {
      res.send({
        message: "form was deleted successfully!",
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: "Could not delete form with id=" + id,
    });
  });
}

exports.UpdateForm = async(req, res) =>{
  
  const id = req.params.id;
console.log("ici");
  Form.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update form with id=${id}. Maybe form was not found!`,
        });
      } else {
        res.send({ message: "form was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating form with id=" + id,
      });
    });
}