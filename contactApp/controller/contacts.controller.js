import Contact from "../models/contact.model.js";

export const getContacts = async(req, res) => {
  const contacts = await Contact.find()
  
  res.render("home", {
    contacts
  });
}

export const getContact =  async (req, res)=>{
  
  //  const contacts = await Contact.findOne({ _id: req.params.id })
  const contact = await Contact.findById(req.params.id)
 res.render("show-contact", { contact });
}

export const addContactPage = (req, res)=>{
  res.render("add-contact",{contacts: []});
}

export const addContact = async (req, res)=>{

  // one way to insert data in database
  // const contact = await Contact.insertOne({
  //   name: req.body.name,
  //   email: req.body.email,
  //   phone: req.body.phone
  // })

  // second way to insert data in database
  const contact = await Contact.create(req.body)

  res.redirect("/");
}


export const updateContactPage = async(req, res)=>{
 const contact = await Contact.findById(req.params.id)
 res.render("update-contact", { contact });
}

export const updateContact = async (req, res) => {
  

  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (contact) {
    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
  }

  res.redirect("/");

}

export const deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/");
}