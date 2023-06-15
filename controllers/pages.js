const Page = require('../models/page');
const SubmitForm = require('../models/submittedForm');

exports.CreatePage =async (req, res) => {
    try {
   

    const page = new Page(req.body);

    const saved_page = await page.save(page);
    if (!saved_page) {
      return res.status(500).send({
        message: "Some error occurred while creating the Intership.",
      });
    }
    return res.status(200).send(page);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Intership.",
    });
  }
}

exports.allPages =async (req, res) => {
    try {
        const pages = await Page.find();
    
        res.status(200).json(pages);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }

};
exports.FormPages =async (req, res) => {
  try {
    const id=req.params.id;
    console.log(id,"id");
      const pages = await Page.findById(id).populate('formName');
  console.log(pages, "pages");
      res.status(200).json(pages);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }

};

exports.FiltredPage =async (req, res) => {
  try {
    const id=req.params.id;
    console.log(id,"idpage");
    let tabsId ="";
    let form = await Page.findById(id).select('formName');
    tabsId = form.formName;
console.log(tabsId , "idform");
    const submissionform = await SubmitForm.find({form :  tabsId}).select('user formSubmissions created').populate('user');
      res.status(200).json(submissionform);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }

};

exports.FiltredPage =async (req, res) => {
  try {
    const id=req.params.id;
    console.log(id,"idpage");
    let tabsId ="";
    let form = await Page.findById(id).select('formName');
    tabsId = form.formName;
console.log(tabsId , "idform");
    const submissionform = await SubmitForm.find({form :  tabsId}).select('user formSubmissions created').populate('user');
      res.status(200).json(submissionform);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }

};

exports.DeletePage = async(req, res) => {
  const id=req.params.id;

  Page.findByIdAndRemove(id)
  .then((data) => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete page with id=${id}. Maybe page was not found!`,
      });
    } else {
      res.send({
        message: "page was deleted successfully!",
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: "Could not delete form with id=" + id,
    });
  });
}

exports.PageByid =async (req, res) => {
  try {
      const forms = await Page.findById(req.params.id).populate('formName');
  console.log(forms);
      res.status(200).json(forms);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }

};
exports.UpdatePage = async(req, res) =>{
  
  const id = req.params.id;
  Page.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update page with id=${id}. Maybe page was not found!`,
        });
      } else {
        res.send({ message: "page was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating page with id=" + id,
      });
    });
}