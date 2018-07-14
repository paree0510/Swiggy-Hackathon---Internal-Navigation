(function(requestWrapper){

    var request = require("request");
    var logger = require("../logger").logger;
    var TIMED_OUT = 'ETIMEDOUT';
    var CONNECTION_REFUSED = 'ECONNREFUSED';

    requestWrapper.makeHttpRequest = function(requestObj, eventName, payload, callback){

        request(requestObj, requestCallback);

        function requestCallback(error, response, body){
            if(error){
                if (error.code == TIMED_OUT) {
                    if (error.connect == true) {
                        logger.warn("%j", {
                            "location": "requestWrapper.makeHttpRequest",
                            "payload": payload,
                            "error": error,
                            "message": eventName + " API Connection Timeout"
                        });
                    } else {
                        logger.warn("%j", {
                            "location": "requestWrapper.makeHttpRequest",
                            "payload": payload,
                            "error": error,
                            "message": eventName + " API Read Timeout"
                        });
                    }
                } else if (error.code == CONNECTION_REFUSED) {
                    logger.warn("%j", {
                        "location": "requestWrapper.makeHttpRequest",
                        "payload": payload,
                        "error": error,
                        "message": eventName + " API Connection Refused"
                    });
                } else {
                    logger.warn("%j", {
                        "location": "requestWrapper.makeHttpRequest",
                        "payload": payload,
                        "error": error,
                        "message": eventName + " API error"
                    });
                }
                callback(error, null);
            } else {
                var data = {};
                if(response.statusCode && response.statusCode.toString().substring(0,1) == '2') {
                    try {
                        if(typeof body == "string"){
                            body = JSON.parse(body);
                        }
                        logger.info("%j", {
                            "location": "requestWrapper.makeHttpRequest",
                            "payload": payload,
                            "statusCode": response.statusCode,
                            "message": eventName + " API Completed"
                        });
                        data = {
                            error : null,
                            body : body
                        };
                    } catch(exc){
                        logger.warn("%j", {
                            "location": "requestWrapper.makeHttpRequest",
                            "payload": payload,
                            "statusCode": response ? response.statusCode : "",
                            "exception": exc,
                            "message": eventName + " API error"
                        });
                        data = {
                            error : exc,
                            body : null
                        };
                    }
                    callback(data.error, data.body);
                } else {
                    logger.info("%j", {
                        "location": "requestWrapper.makeHttpRequest",
                        "payload": payload,
                        "statusCode": response.statusCode,
                        "message": eventName + " API Failed"
                    });
                    if(body){
                        callback(body, null);
                    } else{
                        callback("error",null);
                    }
                }
            }
        }

    };

})(module.exports);
