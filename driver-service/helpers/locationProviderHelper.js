(function (locationProviderHelper) {
    var settings = require("../settings");
    var requestWrapper = require('../utils/httpRequestWrapper');

    locationProviderHelper.getPath = function (apartmentId, blockId, entranceId, callback) {
        var url = settings.locationProviderUrl + '/v1/location/fetch';
        console.log(url);
        var qs = {
            apartment_id: entranceId,
            block_id: blockId,
            entrance_id: entranceId
        };
        var requestTemplate = {
            url: url,
            method: 'GET',
            qs: qs,
            timeout: parseInt(settings.TIMEOUT, 10),
            json: true,
            forever: true,
            headers: {
                'Authorization': settings.BACKEND_BASIC_AUTH
            }
        };

        requestWrapper.makeHttpRequest(requestTemplate, 'Fetching address details', {}, function (error, response) {
            if (error) {
                var errorWrap = {
                    errorCode: 500,
                    errorMsg: error
                };

                return callback(errorWrap, null);
            }

            return callback(null, response.data);
        });
    }
})(module.exports);