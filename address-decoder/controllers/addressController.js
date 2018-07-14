(function(addressController) {

    var responseUtils = require("../utils/responseUtils");

    addressController.getMapping = function (req, res) {
        var addressText = req.query.addressText;

        var response = {};

        var addressArray = addressText.split(",");
        var block = addressArray[0][0];
        var apartment = addressArray[1];
        response.block = block;
        response.apartment = apartment;

        responseUtils.buildAndSendResponse(0, "Fetched apartment", response, res);
    }

})(module.exports);