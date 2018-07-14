(function(locationController) {

    var responseUtils = require("../utils/responseUtils");

    locationController.getLatLng = function (req, res) {
        var response = {};

        var apartment = req.query.apartment;
        var bock = req.query.apartment;
        var entrance = req.query.entrance;

//TODO take list of lat-lng points 

        //response.latlng = latlng;
        responseUtils.buildAndSendResponse(0, "Fetched apartment", response, res);
    }

})(module.exports);