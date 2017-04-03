# myproject1 : Timestamp microservice

HEROKU at https://evening-shelf-34028.herokuapp.com/

A barebones Node.js app using [Express](http://expressjs.com/) to convert
a unix timestamp to a natural language date (Format : DD-MM-YYYY).

User stories:
1) I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (Format : DD-MM-YYYY)
2) If it does, it returns both the Unix timestamp and the natural language form of that date.
3) If it does not contain a date or Unix timestamp, it returns null for those properties.

Example usage:
https://timestamp-ms.herokuapp.com/25-12-2016
https://timestamp-ms.herokuapp.com/1450137600
Example output:
{ "unix": 1450137600, "natural": "December 12, 2016" }