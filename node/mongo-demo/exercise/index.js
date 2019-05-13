const mongoose = require('mongoose');
const debug = require('debug')('all');

mongoose.connect('mongodb://localhost/exercise', { useNewUrlParser: true })
  .then(() => debug('Connected to MongoDB...'))
  .catch(err => debug('FAILED connection to MongoDB...', err));

const data = [
  {"_id":"5a68fdc3615eda645bc6bdec","tags":["express","backend"],"date":"2018-01-24T21:42:27.388Z","name":"Express.js Course","author":"Mosh","isPublished":true,"price":10,"__v":0},
  {"_id":"5a68fdd7bee8ea64649c2777","tags":["node","backend"],"date":"2018-01-24T21:42:47.912Z","name":"Node.js Course","author":"Mosh","isPublished":true,"price":20,"__v":0},
  {"_id":"5a68fde3f09ad7646ddec17e","tags":["aspnet","backend"],"date":"2018-01-24T21:42:59.605Z","name":"ASP.NET MVC Course","author":"Mosh","isPublished":true,"price":15,"__v":0},
  {"_id":"5a68fdf95db93f6477053ddd","tags":["react","frontend"],"date":"2018-01-24T21:43:21.589Z","name":"React Course","author":"Mosh","isPublished":false,"__v":0},
  {"_id":"5a68fe2142ae6a6482c4c9cb","tags":["node","backend"],"date":"2018-01-24T21:44:01.075Z","name":"Node.js Course by Jack","author":"Jack","isPublished":true,"price":12,"__v":0},
  {"_id":"5a68ff090c553064a218a547","tags":["node","backend"],"date":"2018-01-24T21:47:53.128Z","name":"Node.js Course by Mary","author":"Mary","isPublished":false,"price":12,"__v":0},
  {"_id":"5a6900fff467be65019a9001","tags":["angular","frontend"],"date":"2018-01-24T21:56:15.353Z","name":"Angular Course","author":"Mosh","isPublished":true,"price":15,"__v":0}
];

const coursesSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: Date, 
  isPublished: Boolean, 
  price: Number, 
  __v: Number
});

const Courses = mongoose.model('Courses', coursesSchema);

async function createCourse(arr) {
  try {
    let course;
    await Promise.all(arr.map(async obj => {
      course = new Courses({
        name: obj.name,
        author: obj.author,
        tags: obj.tags,
        date: obj.date,
        isPublished: obj.isPublished,
        price: obj.price,
        __v: obj.__v
      });
  
      let result = await course.save();
      debug(result);
    }));
  }
  catch (err) {
    debug(err);
  }
}

// createCourse(data);

async function getCourses() {
  try {
    let result = await Courses
      .find({ isPublished: true })
      .or([ { price: { $gte: 15 } }, { name: /by/ } ])
      .sort('-price')
      .select('name author price');
  
    debug(result);
  }
  catch (err) {
    debug(err);
  }
}

getCourses();

