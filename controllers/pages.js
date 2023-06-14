const Page = require('../models/page');

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