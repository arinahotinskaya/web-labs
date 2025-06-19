const { Sequelize } = require('../config/db');
const Item = require('../models/items.model');
const Purchase = require('../models/purchases.model');
const User = require('../models/user.model');

class PurchasesService {
	async getAll(user_id) {
		try {
			if (!user_id) throw new Error();
			const purchses = await Purchase.findAll({ where: { user_id } });

			return purchses;
		} catch (e) {
			return Error(e);
		}
	}

	async getUsers(user_id) {
		try {
			if (!user_id) throw new Error();
			const purchases = await Purchase.findAll({
				where: { user_id },
			});

			const array = [];

			for (let i = 0; i < purchases.length; i++) {
				const item = await Item.findOne({
					where: { id: purchases[i].item_id },
				});

				array.push({ ...purchases[i].dataValues, item });
			}

			return array;
		} catch (e) {
			return Error(e);
		}
	}

	async createArray(purchases) {
		try {
			console.log(1);
			const purchase = await Purchase.bulkCreate(purchases);
			console.log(2);
			return purchase;
		} catch (e) {
			return Error(e);
		}
	}

	async create(purchases) {
		try {
			const purchase = await Purchase.bulkCreate(purchases);

			return purchase;
		} catch (e) {
			return Error(e);
		}
	}
}

module.exports = new PurchasesService();
