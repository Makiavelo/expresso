var {AfterAll, BeforeAll} = require('cucumber');
const exec = require('child_process').exec;

// Synchronous
BeforeAll(function () {
  const child = exec('mongo expresso --eval "db.getCollectionNames().forEach(function(n){db[n].remove({})});"',
    (error, stdout, stderr) => {
      if(stdout) console.log(`stdout: ${stdout}`);
      if(stderr) console.log(`stderr: ${stderr}`);
      if (error !== null) {
        console.log(`exec error: ${error}`);
      }
    });
});

// Asynchronous Promise
AfterAll(function () {
  //do required cleanup
});