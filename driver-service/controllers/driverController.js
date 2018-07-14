(function(driverController){
    var addressDao = require('../dao/addressDao');
    var logger = require('../logger').logger;
    var responseUtils = require('../utils/responseUtils');

    driverController.getAddress = function(req, res) {

        var orderId = req.query.order_id;
        var latLng = req.query.latLng;

        //get Address(Text) from DB

        addressDao.fetchAddress(orderId, function (err, data) {
            if (err) {
                logger.info("Error getting the data from db");
            } else {
                responseUtils.buildAndSendResponse(0, "SuccessFully fetched the data", data, res);
            }
        })

    };
})(module.exports);
