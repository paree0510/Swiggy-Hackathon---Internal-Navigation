'use strict';
module.exports = function(sequelize, DataTypes) {
    var userLatLng = sequelize.define('Table1', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement :true,
            primaryKey: true
        },
        dest_id : DataTypes.STRING,
        entrance_id : DataTypes.STRING,
        lat_longs : DataTypes.BLOB
    }, {
        underscored: true,
        freezeTableName: true,
        timestamps: false
    });
    return userLatLng;
};