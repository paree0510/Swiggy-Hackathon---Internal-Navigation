'use strict';
module.exports = function(sequelize, DataTypes) {
    var OrderEntrance = sequelize.define('Entrance_Table', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement :true,
            primaryKey: true
        },
        apartment_id : DataTypes.STRING,
        entrance_id : DataTypes.STRING,
        lat_long : DataTypes.STRING
    }, {
        underscored: true,
        freezeTableName: true,
        timestamps: false
    });
    return OrderEntrance;
};