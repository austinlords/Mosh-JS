const debug = require('debug')('app:debug');


async function customerMovies() {
  try {
    const customer = await getCustomer(1);
    debug('Customer:', customer);
    if (customer.isGold) {
      const movies = await getTopMovies();
      debug('Top movies:', movies);
      await sendEmail(customer.email, movies);
      debug('Email Sent!');
    }
  }
  catch (err) {
    debug('Error: something happened :(', err);
  }
}

customerMovies();

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 1000);  
  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 1000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}