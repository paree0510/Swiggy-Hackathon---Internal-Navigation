(function(routers) {
    var express = require("express");
    var routes = express.Router();

    var latlongRouter = require("./latlongRouter");

    routes.use(latlongRouter.routes);
    routers.routes = routes;

})(module.exports);