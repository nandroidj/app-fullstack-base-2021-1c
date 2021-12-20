//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');

const router = require("./smartHome/router");

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================

router(app);

app.listen(PORT, function(request, response) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
