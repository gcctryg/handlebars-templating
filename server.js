var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var peopleData = require('./peopleData.json');
console.log("== peopleData:", peopleData);

var app = express();
var port = 8000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/people', function (req, res, next) {
  res.status(200).sendFile(__dirname + '/public/people.html');
});

app.get('/test', function (req, res, next) {
  res.status(200).render('photoPage', {
    name: "Testing Person",
    photos: [
      {
        url: "http://placekitten.com/480/480?image=3",
        caption: "Kitty from the server side #1."
      },
      {
        url: "http://placekitten.com/480/480?image=4",
        caption: "Kitty from the server side #2."
      },
      {
        url: "http://placekitten.com/480/480?image=5",
        caption: "Kitty from the server side #3."
      },
      {
        url: "http://placekitten.com/480/480?image=6",
        caption: "Kitty from the server side #4."
      },
      {
        url: "http://placekitten.com/480/480?image=7",
        caption: "Kitty from the server side #5."
      }
    ],
    showTheDiv: false
  });
});

app.get('/people/:person', function (req, res, next) {
  var person = req.params.person.toLowerCase();
  if (peopleData[person]) {
    res.status(200).render('photoPage', peopleData[person]);
  } else {
    next();
  }
  // if (availablePeople.indexOf(person) >= 0) {
  //   res.status(200).sendFile(
  //     __dirname + '/public/people/' + person + '.html'
  //   );
  // } else {
  //   next();
  // }
});

app.get("*", function (req, res, next) {
  res.status(404).render('404', {
    url: req.url
  });
});

app.listen(port, function (err) {
  if (err) {
    throw err;
  }
  console.log("== Server listening on port", port);
});
