'use strict';
module.exports = function(sequelize, DataTypes) {
    var ApartmentBlock = sequelize.define('Apartment_Blocks_Map', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement :true,
            primaryKey: true
        },
        apartment_id : DataTypes.STRING,
        block_id : DataTypes.STRING,
        block_lat_long : DataTypes.STRING
    }, {
        underscored: true,
        freezeTableName: true,
        timestamps: false
    });
    return ApartmentBlock;
};