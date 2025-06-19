const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const Item = require('./items.model');
const Purchase = require('./purchases.model');

const User = sequelize.define('User', {
	id: {
		type: DataTypes.INTEGER,
		required: true,
		primaryKey: true,
		autoIncrement: true,
	},
	email: {
		type: DataTypes.STRING,
		required: true,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		required: true,
	},
	user_name: {
		required: false,
		unique: true,
		type: DataTypes.STRING,
	},
	role: {
		required: true,
		defaultValue: 0,
		type: DataTypes.INTEGER,
	},
});

User.belongsToMany(Item, { through: Purchase, foreignKey: 'item_id' });
Item.belongsToMany(User, { through: Purchase, foreignKey: 'user_id' });

module.exports = User;
