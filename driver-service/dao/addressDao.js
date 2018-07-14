(function (addressDAO) {

    var logger = require("../logger").logger;
    var models = require("../models");

    addressDAO.fetchAddress = function (orderId, callback) {
        var whereClause = {};
        if (orderId) {
            whereClause['order_id'] = orderId;
        }
        models.Order_Table.findAll({
            where: whereClause
        }).then(function (response) {
            callback(null, response);
        }).catch(function (error) {
            logger.error("%j", {
                "location": "addressDAO.fetchAddress",
                "orderId": orderId,
                "error": error,
                "message": "Error while fetching user role by ids from DB"
            });
            callback(error, null);
        });
    };

})(module.exports);
