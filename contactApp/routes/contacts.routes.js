import express from "express";
const router = express.Router();


router.get("/", async(req, res) => {
  const contacts = await Contact.find()
  
  res.render("home", {
    contacts
  });

});


router.get("/show-contact/:id", async (req, res)=>{
  
  //  const contacts = await Contact.findOne({ _id: req.params.id })
  const contact = await Contact.findById(req.params.id)
 res.render("show-contact", { contact });
})

router.get("/add-contact", (req, res)=>{
  res.render("add-contact",{contacts: []});
})
router.post("/add-contact", async (req, res)=>{

  // one way to insert data in database
  // const contact = await Contact.insertOne({
  //   name: req.body.name,
  //   email: req.body.email,
  //   phone: req.body.phone
  // })

  // second way to insert data in database
  const contact = await Contact.create(req.body)

  res.redirect("/");
})

router.get("/update-contact/:id", async(req, res)=>{
 const contact = await Contact.findById(req.params.id)
 res.render("show-contact", { contact });
})


router.post("/update-contact/:id", async (req, res) => {
  

  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (contact) {
    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
  }

  res.redirect("/");

});



router.get("/delete-contact/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

export default router;