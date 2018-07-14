(function (settings) {
    settings.MYSQL = {
        "username" : "root",
        "password" : "12345",
        "database" : "hackathon",
        "host" : "localhost",
        "port" : "3306",
        "dialect" : "mysql",
        "logging" : false,
        "pool" : {
        "max" : 100,
            "min" : 0,
            "idle" : 10000
        }
    };

    settings.REDIS = {
    "HOST": "localhost",
    "DB": 0,
    "HOUR_EXPIRY" : 3600
  };

    settings.decoderUrl = "http://localhost:8001";
    settings.locationProviderUrl = "http://localhost:8003";

})(module.exports);