const PurchasesService = require('../services/purchase.service');

class PurchasesController {
	async getAll(req, res) {
		try {
			const { user_id } = req.body;
			const { purchases } = await PurchasesService.getAll(user_id);

			return res.status(200).json({ purchases });
		} catch (e) {
			return res.status(500).json({ message: e.message });
		}
	}

	async addItem(req, res) {
		try {
			const { purchases } = req.body;

			const purchase = await PurchasesService.createArray(purchases);

			return res.status(200).json({ purchase });
		} catch (e) {
			return res.status(500).json({ message: e.message });
		}
	}

	async getUsers(req, res) {
		try {
			const userId = req.params.userId;

			const purchase = await PurchasesService.getUsers(userId);

			return res.status(200).json({ purchase });
		} catch (e) {
			return res.status(500).json({ message: e.message });
		}
	}
}

module.exports = new PurchasesController();
