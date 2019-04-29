//duration = 0 and updates dynamically, reset, start only once, stop not twice in a row

function Stopwatch() {
  let startTime = 0;
  let stopTime = 0;
  let running = false;
  let duration = 0;

  this.start = function() {
    if (running)
      throw new Error('stopwatch already running');
    
    running = true;
    startTime = new Date();
  };

  this.stop = function() {
    if (!running)
      throw new Error('stopwatch is not running');

    running = false;
    stopTime = new Date();
    let interval = parseFloat(((stopTime - startTime) / 1000).toFixed(2));
    duration += interval;
  };

  this.reset = function() {
    startTime = 0;
    stopTime = 0;
    running = false;
    duration = 0;
  }

  Object.defineProperty(this, 'duration', {
    get: function() { return duration; }
  });

};

const sw = new Stopwatch();
