const AuthService = require('../services/auth.service');
const { validationResult } = require('express-validator');
const path = require('path');

class AuthController {
	async signup(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(504).json({ message: 'Ошибка при валидации' });
			}
			const { email, password, role } = req.body;
			const data = await AuthService.registration(email, password, role);

			return res.json(data);
		} catch (e) {
			console.log(e);
			return res.status(500).json({ message: 'Ошибка сервера' });
		}
	}

	async signin(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(504).json({ message: 'Ошибка при валидации' });
			}
			const { email, password } = req.body;
			const data = await AuthService.login(email, password);

			return res.json(data);
		} catch (e) {
			console.log(e);
			return res.status(500).json({ message: e.message });
		}
	}
}

module.exports = new AuthController();
