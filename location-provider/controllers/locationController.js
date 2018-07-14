(function(locationController) {
	
	var locationDao = require('../dao/locationDao')
	var logger = require('../logger').logger;
    var responseUtils = require("../utils/responseUtils");

    locationController.getLatLng = function (req, res) {
        var response = {};

        var apartmentId = req.query.apartment;
        var blockId = req.query.block;
        var entranceId = req.query.entrance;

        locationDao.fetchLatLong(123,456, function(err, data){
        if(err){
        	logger.info("Error fetching user loaction data from db");
        }else{
	    	var latLng = data[0].lat_longs.toString('utf-8');
	    	var value = {
	    		"lat_lngs" : JSON.parse(latLng)
	    	}
        	logger.info(latLng);
        	responseUtils.buildAndSendResponse(0, "SuccessFully fetched the data", value, res);
        }
        })              
    };

})(module.exports);