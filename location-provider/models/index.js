'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var settings = require("../settings.js");
var logger = require("../logger").logger;
var db        = {};
var sequelize = new Sequelize(settings.MYSQL.database, settings.MYSQL.username, settings.MYSQL.password, settings.MYSQL);

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename);
    })
    .forEach(function(file) {
        if (file.slice(-3) !== '.js') return;
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        logger.info("%j", {
            "location": "models.index",
            "message": "association called",
            "model" : modelName
        });
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;