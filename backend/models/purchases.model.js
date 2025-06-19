const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const User = require('./user.model');

const Purchase = sequelize.define('Purchase', {
	id: {
		type: DataTypes.INTEGER,
		required: true,
		primaryKey: true,
		autoIncrement: true,
	},
	user_id: {
		type: DataTypes.INTEGER,
	},
	item_id: {
		type: DataTypes.INTEGER,
	},
});

module.exports = Purchase;
