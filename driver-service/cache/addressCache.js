(function(addressCache){
    var redis = require("../redis");
    var settings = require("../settings");
    var logger = require("../logger").logger;
    var orderIdKey = "orderId_";

    addressCache.addOrderDetails = function(orderId, blockId, entranceId, callback) {
        var obj = {
            blockId: blockId,
            entranceId: entranceId
        };
        redis.updateMultiHash(orderIdKey+orderId, obj, addedToCache, false, settings.REDIS.HOUR_EXPIRY);
        function addedToCache(error, reply) {
            if (error) {
                logger.warn("%j", {
                    "location": "addressCache.addOrderDetails",
                    "orderId": orderId,
                    "blockId": blockId,
                    "entranceId": entranceId,
                    "error": error,
                    "message": "Error while adding order in cache"});
                callback(error, null);
            } else {
                callback(null, reply);
            }
        }
    };

    addressCache.getOrderData = function (orderId, callback) {
        redis.fetchHash(orderIdKey+orderId, gotFromCache, false);
        function gotFromCache(error, reply) {
            if (error) {
                logger.warn("%j", {
                    "location": "addressCache.getOrderData",
                    "orderId": orderId,
                    "error": error,
                    "message": "Error while getting order in cache"});
                callback(error, null);
            } else {
                callback(null, reply);
            }
        }
    }

})(module.exports);
