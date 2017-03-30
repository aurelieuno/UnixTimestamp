/**API Basejump: Timestamp microservice
User stories:
1) I can pass a string as a parameter, and it will check to see whether that string contains
either a unix timestamp or a natural language date (example: January 1, 2016)
2) If it does, it returns both the Unix timestamp and the natural language form of that date.
3) If it does not contain a date or Unix timestamp, it returns null for those properties.
Example usage:
https://timestamp-ms.herokuapp.com/December%2015,%202015
https://timestamp-ms.herokuapp.com/1450137600
Example output:
{ "unix": 1450137600, "natural": "December 15, 2015" }**/


var express        =         require("express");
var app            =         express();
var path = require("path");

app.set('port', 5000);

app.use(express.static(__dirname));
app.use(require('stylus').middleware(__dirname));

//This is how to specify path in a typical Express.js app when the
//folder is 'templates'
app.set('views', path.join(__dirname, 'templates'))
//what template engine to use
app.set('view engine', 'pug')


/////////////////////////////////////////////////////////////

    app.get('/', function(req, res){
      res.sendFile(path.join(__dirname+'/index.html'));
         });

/////////////////////////////////////////////////////////

    app.use(function (req, res, next) {
      var date = req.originalUrl.slice(1);
      var datecheck = /(\d{1,2}) (January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})/i;
      var datecheck2 = /(\d{1,2})-(\d{1,2})-(\d{4})/;//DD/MM/YYYY

      if (/^\d+$/.test(date)) {
        var date2= new Date(date*1000);
        res.send({ "unix" : date, "natural" : date2});

      } else if (datecheck2.test(date)) {
        var match = datecheck2.exec(date);//[ '30-1-2003', '30', '1', '2003', index: 0, input: '30-1-2003' ]
      var newdate = new Date(Number(match[3]),
                  Number(match[2]) - 1,
                  Number(match[1]));
      var newunix = newdate.getTime()/1000;
      res.send({ "unix" : newunix, "natural" : newdate});

      } else {
        res.send({ "unix" : "null", "natural" : "null"});
      }

      // app.use(function (req, res, next) {
      // var date = req.originalUrl.slice(1);
      // var datecheck = /(\d{1,2}) (January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})/i;
      // var datecheck2 = /(\d{1,2})-(\d{1,2})-(\d{4})/;//DD/MM/YYYY

      // if (/^\d+$/.test(date)) {
      //   var date2= new Date(date*1000);
      //   var date3={ "unix" : date, "natural" : date2};

      // } else if (datecheck2.test(date)) {
      //   var match = datecheck2.exec(date);//[ '30-1-2003', '30', '1', '2003', index: 0, input: '30-1-2003' ]
      // var newdate = new Date(Number(match[3]),
      //             Number(match[2]) - 1,
      //             Number(match[1]));
      // var newunix = newdate.getTime()/1000;
      // var date3= { "unix" : newunix, "natural" : newdate};

      // } else {
      //   var date3= { "unix" : "null", "natural" : "null"};
      // }

      //  res.render('index', {message: date3});
      //  res.end();


});

app.listen(app.get('port'),function(){
  console.log("Started on PORT 5000");
})


//http://localhost:5000/December%2015,%202015
//{"url1":"/December%2015,%202015"}
/**
year
Integer value representing the year.
Values from 0 to 99 map to the years 1900 to 1999.
month
Integer value representing the month, beginning with 0 for January to 11 for December



**/