const ItemsService = require('../services/items.service');

class ItemsController {
	async getById(req, res) {
		try {
			const { item } = await ItemsService.getById(req.params.id);

			return res.status(200).json({ item });
		} catch (e) {
			return res.status(500).json({ message: e.message });
		}
	}

	async getAll(req, res) {
		try {
			const { items } = await ItemsService.getAll();

			return res.status(200).json({ items });
		} catch (e) {
			return res.status(500).json({ message: e.message });
		}
	}

	async addItem(req, res) {
		try {
			const { title, description, price } = req.body;

			const { item } = await ItemsService.addItem(title, description, price);

			return res.status(200).json({ item });
		} catch (e) {
			return res.status(500).json({ message: e.message });
		}
	}
}

module.exports = new ItemsController();
