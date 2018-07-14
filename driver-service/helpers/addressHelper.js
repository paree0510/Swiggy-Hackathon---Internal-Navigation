(function (addressHelper) {
    var addressDao = require('../dao/addressDao');
    var addressDecoderHelper = require('./addressDecoderHelper');
    var apartmententrtanceDao = require('../dao/apartmentEntranceDao');
    var logger = require('../logger').logger;
    var _ = require('underscore');
    var geolib = require('geolib');
    
    addressHelper.fetchAddress = function(orderId, latLng,  callback) {
        addressDao.fetchAddress(orderId, function (err, data) {
            if (err) {
                logger.info("Error getting the data from db");
                callback(err, null);
            } else {
                var address = data[0].address;
                logger.info("Address : ", address);
                addressDecoderHelper.getAddressLatLng(address, function (err, resp) {
                    if (err) {
                        logger.info("error : ", err);
                    } else {
                        logger.info("resp : ", resp);

                        var apartmentId = resp.apartment;
                        var blockId = resp.block;
                        fetchNearestEntrance(apartmentId, latLng, function (err, data) {
                            if (err) {
                                logger.info("Error : ", err);
                            } else {
                                callback(null, data);
                            }
                        })
                    }
                });
            }
        })
    };

    addressHelper.fetchLatLongFromAddress = function(address, callback) {
        addressDecoderHelper.getAddressLatLng(address, callback);
    };

    function fetchNearestEntrance (apartmentId, latLng, callback) {
        apartmententrtanceDao.fetchAllEntrances(apartmentId, function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                logger.info(data);

                //get nearest entrance id

                var min = 9007199254740992;
                var latLngArr2 = latLng.split(",");
                var lat2 = latLngArr2[0];
                var long2 = latLngArr2[1];

                var result = {
                    "lat" : 0,
                    "lang" : 0,
                    "entrance_id" : ""
                };
                _.each(data, function (latLong) {
                    var latLngArr = latLong.lat_long.split(",");
                    var lat1 = latLngArr[0];
                    var long1 = latLngArr[1];

                    var dist = calculateDistance(lat1, long1, lat2, long2)

                    if (dist < min) {
                        min = dist;
                        result.lat = lat1;
                        result.lang = long1;
                        result.entrance_id = latLong.entrance_id;
                    }
                });

                //
                callback(null, result);
            }
        })
    }


    function calculateDistance(lat1, long1, lat2, long2) {
        logger.info("Lat 1 : ", lat1, " Long 1 : ", long1, " Lat 2 : ", lat2, " Long 2 : ", long2);
        // var point1 = new GeoPoint(lat1, long1);
        // var point2 = new GeoPoint(lat2, long2);
        return geolib.getDistanceSimple({latitude: lat1, longitude: long1}, {latitude: lat2.replace(/[^0-9]/g, ''), longitude: long2.replace(/[^0-9]/g, '')})
    }

})(module.exports);