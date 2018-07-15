(function (locationDao) {

    var logger = require("../logger").logger;
    var models = require("../models");

    locationDao.fetchLatLong = function (destId,entranceId, callback) {
        var whereClause = {};
        if (destId && entranceId) {
            whereClause['dest_id'] = destId;
            whereClause['entrance_id'] = entranceId;
        }
        models.Table1.findOne({
            where: whereClause,
            logging: true
        }).then(function (userPasswords) {
           logger.info("%j", {
               "location": "locationDao.fetchLatLon",
               "message": "Successfully fetched user latlong from DB"
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


    locationDao.pushLatLong = function (destId,entranceId,latlngs, callback) {
      console.log(JSON.stringify(latlngs));
    var userDetails = {    
               dest_id: destId,
               entrance_id: entranceId,
               lat_longs: JSON.stringify(latlngs)
       };
       models.Table1.create(userDetails).then(function (userPasswords) {
           logger.info("%j", {
               "location": "locationDao.pushLatLong",
               "message": "Successfully pushed user latlong in DB"
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
