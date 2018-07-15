(function (addressHelper) {
    var addressDao = require('../dao/addressDao');
    var addressDecoderHelper = require('./addressDecoderHelper');
    var apartmententrtanceDao = require('../dao/apartmentEntranceDao');
    var locationProviderHelper = require('./locationProviderHelper');
    var logger = require('../logger').logger;
    var _ = require('underscore');
    var geolib = require('geolib');
    var addressCache = require('../cache/addressCache');
    
    addressHelper.fetchAddress = function(orderId, latLng,  callback) {
        addressDao.fetchAddress(orderId, function (err, data) {
            if (err) {
                logger.error("Error getting the data from db");
                callback(err, null);
            } else {
                var address = data[0].address;
                logger.info("Address : ", address);
                addressDecoderHelper.getAddressLatLng(address, function (err, resp) {
                    if (err) {
                        logger.info("error : ", err);
                        callback(err, null);
                    } else {
                        logger.info("resp : ", resp);

                        var apartmentId = resp.data.apartment;
                        var blockId = resp.data.block;

                        fetchNearestEntrance(apartmentId, latLng, function (err, result) {
                            if (err) {
                                logger.info("Error : ", err);
                                callback(err, null);
                            } else {

                                addressCache.addOrderDetails(orderId, blockId, result.entrance_id, function (error, data) {
                                    if (error) {
                                        callback(error, null);
                                    } else {
                                        locationProviderHelper.getPath(apartmentId, blockId, result.entrance_id, function (err, data) {
                                            if (err) {
                                                logger.info("Error while getting path. Error : ", err);
                                                callback(err, null);
                                            } else {
                                                var r = [];
                                                _.each(data.lat_lngs, function(latLng){
                                                    var a = {
                                                        lat: latLng[0],
                                                        lng: latLng[1]
                                                    };
                                                    r.push(a);
                                                });
                                                var d = {
                                                    lat_lngs: r
                                                };
                                                callback(null, d);
                                            }
                                        });
                                    }
                                });
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

                    var dist = calculateDistance(lat1, long1, lat2, long2);

                    if (dist < min) {
                        min = dist;
                        result.lat = lat1;
                        result.lang = long1;
                        result.entrance_id = latLong.entrance_id;
                    }
                });

                //get path from
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

    addressHelper.postAddress = function(orderId, lat_longs, callback){
        addressCache.getOrderData(orderId, function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                console.log(orderId, data);
                var l = [];
                _.each(lat_longs, function (lat_long) {
                    l.push([lat_long.lat, lat_long.lng]);
                });
                locationProviderHelper.postAddress(data.blockId, data.entranceId, l, callback);
            }
        })
    };
})(module.exports);