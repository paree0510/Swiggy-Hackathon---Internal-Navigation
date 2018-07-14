(function (apartmentEntranceDao) {

    var logger = require("../logger").logger;
    var models = require("../models");

    apartmentEntranceDao.fetchAllEntrances = function (apartmentId, callback) {
        var whereClause = {};
        if (apartmentId) {
            whereClause['apartment_id'] = apartmentId;
        }
        models.Entrance_Table.findAll({
            where: whereClause,
            raw : true
        }).then(function (response) {
            callback(null, response);
        }).catch(function (error) {
            logger.error("%j", {
                "location": "apartmentEntranceDao.fetchAllEntrances",
                "apartmentId": apartmentId,
                "error": error,
                "message": "Error while fetching entrances from DB"
            });
            callback(error, null);
        });
    };

})(module.exports);
