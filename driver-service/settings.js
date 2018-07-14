(function (settings) {
    settings.MYSQL = {
        "username" : "root",
        "password" : "notarealpassword",
        "database" : "hack",
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

    settings.decoderUrl = "";


})(module.exports);