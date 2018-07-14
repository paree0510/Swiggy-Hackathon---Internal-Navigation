(function(logger){

    var colors = require('colors');

    logger.logger = require('tracer')
        .colorConsole(
            {
                format : [
                    '{"timestamp":"{{timestamp}}","title":"{{title}}","file":"{{file}}","line":{{line}},"message":{{message}}}'
                ],
                filters : {
                    trace : colors.magenta,
                    debug : colors.blue,
                    info : colors.green,
                    warn : colors.yellow,
                    error : [ colors.red, colors.bold ]
                },
                dateformat : "yyyy-mm-dd HH:MM:ss.L",
                preprocess :  function(data){
                    data.title = data.title.toUpperCase();
                }
            });

})(module.exports);