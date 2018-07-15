(function (apartmentBlockDao) {

    var logger = require("../logger").logger;
    var models = require("../models");

    apartmentBlockDao.fetchAllBlocks = function (apartmentId, callback) {
        var whereClause = {};
        if (apartmentId) {
            whereClause['apartment_id'] = apartmentId;
        }
        models.Apartment_Blocks_Map.findAll({
            where: whereClause
        }).then(function (response) {
            callback(null, response);
        }, function (error) {
            logger.error("%j", {
                "location": "addressDAO.fetchAddress",
                "error": error,
                "message": "Error while fetching user role by ids from DB"
            });
            callback(error, null);
        });
    };

})(module.exports);