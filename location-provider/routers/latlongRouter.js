(function(latlongRouter){

    var locationController = require("../controllers/locationController");

    var express = require("express");

    var routes = express.Router();

    routes.get('/v1/location', locationController.getLatLng);
    latlongRouter.routes = routes;

})(module.exports);