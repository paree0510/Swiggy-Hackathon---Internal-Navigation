(function(responseUtils){

    responseUtils.buildAndSendResponse = function (statusCode, statusMessage, data, res) {
        var response = {
            statusCode: statusCode,
            statusMessage: statusMessage,
            data: data
        };
        res.set("Content-Type", "application/json");
        res.status(200).send(response);
    }

})(module.exports);