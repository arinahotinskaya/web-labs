const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Item = sequelize.define('Item', {
	id: {
		type: DataTypes.INTEGER,
		required: true,
		primaryKey: true,
		autoIncrement: true,
	},
	title: {
		type: DataTypes.STRING,
		required: true,
		unique: true,
	},
	description: {
		type: DataTypes.STRING,
		required: false,
	},
	image: {
		type: DataTypes.STRING,
		required: false,
	},
	price: {
		type: DataTypes.INTEGER,
		required: true,
	},
});

module.exports = Item;
