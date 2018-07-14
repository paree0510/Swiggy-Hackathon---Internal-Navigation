(function (locationDao) {

    var logger = require("../logger").logger;
    var models = require("../models");

    locationDao.fetchLatLong = function (destId,entranceId, callback) {
        var whereClause = {};
        if (destId && entranceId) {
            whereClause['dest_id'] = destId;
            whereClause['entrance_id'] = entranceId;
        }
        models.Table1.findAll({
            where: whereClause,
            logging: true
        }).then(function (userPasswords) {
           logger.info("%j", {
               "location": "userDAO.updateUserPasswordStatus",
               "message": "Successfully updated user password status in DB"
           });
           callback(null, userPasswords);
       }, function (error) {
           logger.warn("%j", {
               "location": "userDAO.updateUserPasswordStatus",
    
               "error": error,
               "message": "Error while updating user in DB"
           });
           callback(error, null);
       });
    };

})(module.exports);
