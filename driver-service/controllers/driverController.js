(function(driverController){
    var logger = require('../logger').logger;
    var responseUtils = require('../utils/responseUtils');
    var addressHelper = require('../helpers/addressHelper');

    driverController.getAddress = function(req, res) {

        var orderId = req.query.order_id;
        var latLng = req.query.latLng;

        //get Address(Text) from DB
        addressHelper.fetchAddress(orderId, latLng,  function (err, data) {
            if (err) {
                responseUtils.buildAndSendResponse(1, "error", null, res);
            } else {
                responseUtils.buildAndSendResponse(0, "Successfully fetched data", data, res);
            }
        });

    };



})(module.exports);
