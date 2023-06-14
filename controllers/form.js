const Form = require('../models/forms');


exports.allForms =async (req, res) => {
    try {
        const forms = await Form.find();
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