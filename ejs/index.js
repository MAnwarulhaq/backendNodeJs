// const express = require("express")

import express from "express"
const app = express()

app.use(express.urlencoded({ extended: false }))

app.set("view engine","ejs")
// app.set("views","./my-templates")
app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})

app.get("/",(req,res)=>{
    res.send("Hello World")
})

// app.get("/about",(req,res)=>{
//     res.send("This is the about page")
// })

app.get("/about",(req,res)=>{
    res.render("about", {
        name: "John Doe",
        age: 30,
        hobbies: ["Reading", "Traveling", "Cooking"]
        })
})

app.get("/form",(req,res)=>{
    res.render("form")
})

app.post("/submit",(req,res)=>{
    // const { name, age, hobbies } = req.body
    // const message = `Name: ${name}, Age: ${age}, Hobbies: ${hobbies}`
    const name = req.body.name
    const message = `Your name is ${name} and form successfully submited!`
    res.send(message)
})