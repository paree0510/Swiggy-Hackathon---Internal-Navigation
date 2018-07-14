(function(routers) {
    var express = require("express");
    var routes = express.Router();
    var driverRouter = require('./driverRouter');

    routes.use(driverRouter.routes);
    routers.routes = routes;

})(module.exports);
