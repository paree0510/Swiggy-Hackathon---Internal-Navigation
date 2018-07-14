(function(latlongRouter){

    var locationController = require("../controllers/locationController");

    var express = require("express");

    var routes = express.Router();

    routes.get('/v1/location/fetch', locationController.getLatLng);
    routes.post('/v1/location/push', locationController.pushLatLong);
    latlongRouter.routes = routes;

})(module.exports);