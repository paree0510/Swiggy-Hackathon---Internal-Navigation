(function (addressDecoderHelper) {
    var settings = require("../settings");

    addressDecoderHelper.getAddressLatLng = function (address, callback) {
        var url = settings.decoderUrl + '/v1/address/decode?restaurant_id=' + address;

        var requestTemplate = {
            url: url,
            method: GET,
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

            return callback(null, response);
        });

        callback(null, data);
    }
})(module.exports);