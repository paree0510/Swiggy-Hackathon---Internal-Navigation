(function(locationController) {
	
	var locationDao = require('../dao/locationDao')
	var logger = require('../logger').logger;
    var responseUtils = require("../utils/responseUtils");

    locationController.getLatLng = function (req, res) {
        
        var response = {};
        var blockId = req.query.block_id;
        var entranceId = req.query.entrance_id;
        
        if (!blockId || !entranceId) {
            responseUtils.buildAndSendResponse(-1, "Invalid input", null, res);
            return;
        }

        locationDao.fetchLatLong(blockId,entranceId, function(err, data){
        if(err){
        	logger.info("Error fetching user loaction data from db");
        }else{
	    	var latLng = data.lat_longs.toString('utf-8');
	    	var value = {
	    		"lat_lngs" : JSON.parse(latLng)
	    	}
        	responseUtils.buildAndSendResponse(0, "SuccessFully fetched the user latlng", value, res);
        }
        })              
    };

    locationController.pushLatLong = function (req, res) {
        var response = {};

        var userLatLngDetails =  req.body;
    
        locationDao.pushLatLong(userLatLngDetails.destId, userLatLngDetails.entranceId,userLatLngDetails.latlngs, function(err, data){
        if(err){
        	logger.info("Error fetching user loaction data from db");
        }else{
        	responseUtils.buildAndSendResponse(0, "SuccessFully added the user latLng", "", res);
        }
        })              
    };
})(module.exports);