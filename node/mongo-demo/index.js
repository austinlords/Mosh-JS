const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    minlength: 5, 
    maxlength: 255,
  },
  category: {
    type: String, 
    required: true,
    enum: ['web', 'mobile', 'network'], 
    lowercase: true, 
    trim: true
  },
  author: String,
  tags: {
    type: Array,
    validate: function(v) {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result = v && v.length > 0), 2000);
      });
    }
  }, 
  date: { type: Date, default: Date.now },
  isPublished: Boolean, 
  price: {
    type: Number, 
    required: function() { return this.isPublished; }, 
    min: 10, 
    max: 200, 
    get: v => Math.round(v),
    set: v => Math.round(v)
  }
});

const Course = mongoose.model('Course', courseSchema);


async function createCourse() {
  const course = new Course({
    name: 'Angular Course', 
    category: 'Web',
    author: 'Mosh',
    tags: ['frontend, angular'],
    isPublished: true, 
    price: 18.7
  });

  try {
    await course.validate();
    const result = await course.save();
    console.log(result);
  }
  catch (err) {
    for (field in err.errors)
      console.log(err.errors[field].message)
  }
}

async function getCourses() {
  const courses = await Course
    .find({ isPublished: true })
    .or([ { price: { $gte: 15 } }, { name: /by/ } ])
    .sort('name')
    .countDocuments();
  console.log(courses);
}

createCourse();
// getCourses();

async function removeCourse(id) {

  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

// removeCourse('5cd9b3543b6a2a51ecafedbb');


