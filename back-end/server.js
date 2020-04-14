const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/family', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});


//photos
const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  people: String,
  path: String,
});

// Create a model for  photos
const Item = mongoose.model('Item', itemSchema);

app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/photos', upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    people:req.body.people,
    description: req.body.description,
    path: req.body.path,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id
    });
    item.title = req.body.title,
    item.people = req.body.people,
    item.description = req.body.description,
    await item.save()
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});





















//person

const uploadPersonPhoto = multer({
  dest: '../front-end/public/people',
  limits: {
    fileSize: 10000000
  }
});

//photos
const personSchema = new mongoose.Schema({
  fullName: String,
  location: String,
  birthday: String,
  peoplePath: String,
});

// Create a model for  photos
const Person = mongoose.model('Person', personSchema);

app.get('/api/peopleList', async (req, res) => {
  try {
    let peopleList = await Person.find();
    res.send(peopleList);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/people', uploadPersonPhoto.single('profilePhoto'), async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    peoplePath: "/people/" + req.file.filename
  });
});

app.post('/api/peopleList', async (req, res) => {
  const person = new Person({
    fullName: req.body.fullName,
    birthday:req.body.birthday,
    location: req.body.location,
    peoplePath: req.body.peoplePath,
  });
  try {
    await person.save();
    res.send(person);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/peopleList/:id', async (req, res) => {
  try {
    await Person.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/peopleList/:id', async (req, res) => {
  try {
    let person = await Person.findOne({
      _id: req.params.id
    });
    person.fullName = req.body.fullName,
    person.birthday = req.body.birthday,
    person.location = req.body.location,
    await person.save()
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});



















app.listen(3001, () => console.log('Server listening on port 3001!'));
