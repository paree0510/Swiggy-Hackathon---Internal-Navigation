(function(routers) {
    var express = require("express");
    var routes = express.Router();

    var addressRouter = require("./addressRouter");

    routes.use(addressRouter.routes);
    routers.routes = routes;

})(module.exports);
