'use strict';
module.exports = function(sequelize, DataTypes) {
    var OrderAddress = sequelize.define('Order_Table', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement :true,
            primaryKey: true
        },
        order_id : DataTypes.INTEGER,
        address : DataTypes.STRING
    }, {
        underscored: true,
        freezeTableName: true,
        timestamps: false
    });
    return OrderAddress;
};