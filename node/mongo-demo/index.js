const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ], 
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);


async function createCourse() {
  const course = new Course({
    name: 'Angular Course', 
    author: 'Mosh',
    tags: ['angular', 'frontend'],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const courses = await Course
    .find({ isPublished: true })
    .or([ { price: { $gte: 15 } }, { name: /by/ } ])
    .sort('name')
    .countDocuments();
  console.log(courses);
}

// createCourse();
// getCourses();

async function removeCourse(id) {

  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

removeCourse('5cd9b3543b6a2a51ecafedbb');


