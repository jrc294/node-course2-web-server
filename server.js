const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs');

app.use((reque, respo, next) => {
  var now = new Date().toString();
  var log = `${now}: ${reque.method} ${reque.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear();
});

// app.use((aaa, bbb, next) => {
//   bbb.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

hbs.registerPartials(__dirname + '/views/partials');
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Jonathan',
  //   likes: [
  //     'Biking',
  //     'Cities'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Welcome Page',
    welcomeMessage: 'Hello. Welcome to our website'
  });
});

app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req,res) => {
  res.send({
    error: 'Something went wrong'
  });
})

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});