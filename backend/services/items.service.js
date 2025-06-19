const Item = require('../models/items.model');

class ItemsService {
	async getById(id) {
		try {
			const item = await Item.findOne({ where: { id } });

			return { item };
		} catch (e) {
			throw new Error('Ошибка');
		}
	}

	async getAll() {
		try {
			const items = await Item.findAll();

			return { items };
		} catch (e) {
			throw new Error('Ошибка');
		}
	}

	async addItem(title, description = '', price) {
		try {
			const item = await Item.create({
				title,
				description,
				price,
			});

			return { item };
		} catch (e) {
			throw new Error('Ошибка');
		}
	}
}

module.exports = new ItemsService();
