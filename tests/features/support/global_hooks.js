var {AfterAll, BeforeAll} = require('cucumber');

// Synchronous
BeforeAll(function () {
  //truncate test db
});

// Asynchronous Promise
AfterAll(function () {
  //do required cleanup
});