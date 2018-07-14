(function (driverRouter) {

    var driverController = require("../controllers/driverController");
    var express = require("express");
    var routes = express.Router();

    routes.get('/v1/getAddress/', driverController.getAddress);
    driverRouter.routes = routes;

})(module.exports);