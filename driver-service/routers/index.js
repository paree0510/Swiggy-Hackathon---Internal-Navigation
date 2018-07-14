(function(routers) {
    var express = require("express");
    var routes = express.Router();

    //routes.use(authenticationRouter.routes);
    routers.routes = routes;

})(module.exports);
