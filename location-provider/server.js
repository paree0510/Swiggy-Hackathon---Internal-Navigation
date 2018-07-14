
var logger = require("./logger").logger;

var http = require("http");

var express = require("express");


var app = express();

// Body Parser Middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "20mb"}));
app.use(bodyParser.urlencoded({ extended : true }));


app.get("/", function(req, res){
    res.status(200).send("Success");
});

// Routing
var routes = require("./routers").routes;
app.use('/', routes);
// Error Handling
app.use(logErrors);
function logErrors(err, req, res, next) {
    logger.error("%j", {
        "location": "server",
        "errorStack": err.stack
    });
    res.status(500).send();
}

var server;
server = http.createServer(app);
server.listen(8003);
console.log("Server started");