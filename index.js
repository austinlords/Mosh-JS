// Factory Function
function createCircle(radius) {
  return {
    radius,
    draw: function() {
      console.log('draw');
    }
  }; 
}
const circle = createCircle(1);
circle.draw();

//Constructor Function
function Circle(radius) {
  this.radius = radius;

  let defaultLocation = { x: 0, y: 0 };

  let computeOptimumLocation = function() {
    // ...
  };
  this.draw = function() {
    computeOptimumLocation();
    // defaultLocation
    console.log('draw');
  };
}
const another = new Circle(15);
another.draw();
console.log(another.constructor);
console.log(circle.constructor);

// 'Circle.call({}, 1)' is the same as 'new Circle(1)'
// 'Circle.apply({}, [1, 2, 3])' is same as .call, except second parameter is an array. 

const arr = ['aasd', 7, {}, 4, 'bye'];

for (let element of arr)
  console.log(element);

const obj = { value: 1, hello: 'hellooo', another: 99 };

for (let key in obj)
  console.log(key, obj[key]);


const keys = Object.keys(obj);
console.log(keys);

if ('hello' in obj)
  console.log('obj has hello');


