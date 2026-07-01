const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const Contact = require("./models/contact.model")

// Database connection
mongoose.connect("mongodb://localhost:27017/contactApp", )
.then(() => {
  console.log("Database connected");
})
.catch((err) => {
  console.log("Database connection error: ", err);
});
// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false}));
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Routes

app.get("/", async(req, res) => {
  const contacts = await Contact.find()
  
  res.render("home", {
    contacts
  });

});


app.get("/show-contact/:id", async (req, res)=>{
  
  //  const contacts = await Contact.findOne({ _id: req.params.id })
  const contact = await Contact.findById(req.params.id)
 res.render("show-contact", { contact });
})

app.get("/add-contact", (req, res)=>{
  res.render("add-contact",{contacts: []});
})
app.post("/add-contact", async (req, res)=>{

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

app.get("/update-contact/:id", async(req, res)=>{
 const contact = await Contact.findById(req.params.id)
 res.render("show-contact", { contact });
})


app.post("/update-contact/:id", async (req, res) => {
  

  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (contact) {
    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
  }

  res.redirect("/");

});



app.get("/delete-contact/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/");
});