(function(addressRouter){

    var addressController = require("../controllers/addressController");

    var express = require("express");

    var routes = express.Router();

    routes.get('/v1/address/decode', addressController.getMapping);
    addressRouter.routes = routes;

})(module.exports);