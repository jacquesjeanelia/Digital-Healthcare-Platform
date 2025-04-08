const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
app.use(express.urlencoded({ extended: true }));
const MyData = require('./models/schema.js');
app.set('view engine', 'ejs');
app.use(express.static('public'));
const path = require('path');

app.get('/', (req, res) => {
    res.render("main");
})

app.get('/clinic/clinic.ejs', (req, res) => {
    res.render("clinic/clinic");
})

app.get('/clinic/modify-working-hours.ejs', (req, res) => {
    res.render("clinic/modify-working-hours");
})

app.get('/clinic/view-doctor.ejs', (req, res) => {
    res.render("clinic/view-doctor");
})

app.get('/clinic/view-patient.ejs', (req, res) => {
    res.render("clinic/view-patient");
})

app.get('/clinic/edit-doctor.ejs', (req, res) => {
    res.render("clinic/edit-doctor");
})

app.get('/clinic/edit-patient.ejs', (req, res) => {
    res.render("clinic/edit-patient");
})

app.get('/patient/login.ejs', (req, res) => {
    res.render("patient/login");
})

app.get('/patient/signup.ejs', (req, res) => {
    res.render("patient/signup");
})

app.get('/patient/patient.ejs', (re, res) => {
    res.render("patient/patient");
})

app.get('/patient/info.ejs', (re, res) => {
    res.render("patient/info");
})

app.get('/patient/browse.ejs', (re, res) => {
    res.render("patient/browse");
})

app.get('/patient/clinic.ejs', (re, res) => {
    res.render("patient/clinic");
})


mongoose
    .connect("mongodb+srv://jacquesjeanelia:zP8bMaIJgBkm0g67@cluster0.wlkgjnh.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    })})
    .catch((err) => {console.log(err)})

app.post("/views/account.html", (req, res) => {
    const data = new MyData(req.body);
    data.save().then(() => {
        res.redirect("/views/account.html")})
        .catch((err) => {
        console.log(err);
    })
    console.log(req.body)
    
})