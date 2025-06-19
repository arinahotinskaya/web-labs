const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
	async registration(email, password, role = 0, user_name = '') {
		const candidate = await User.findOne({ where: { email: email } });
		if (candidate) {
			throw new Error('Email уже используется');
		}

		const hashedPassword = await bcrypt.hash(password, 5);
		const user = await User.create({
			email,
			password: hashedPassword,
			role: role,
			user_name: user_name.length ? user_name : email,
		});

		const token = jwt.sign({ email, password }, process.env.SECRET, {
			expiresIn: '30d',
		});

		delete user.password;

		return {
			token,
			userData: {
				id: user.id,
				email: user.email,
				user_name: user.user_name,
				role: user.role,
			},
		};
	}

	async login(email, password) {
		const user = await User.findOne({
			where: {
				email: email,
			},
		});

		const verify = bcrypt.compare(password, user.password);

		if (!verify) throw new Error('Неверный логин или пароль');

		const token = jwt.sign({ email, password }, process.env.SECRET, {
			expiresIn: '30d',
		});

		return {
			token,
			userData: {
				id: user.id,
				email: user.email,
				user_name: user.user_name,
				role: user.role,
			},
		};
	}
}

module.exports = new AuthService();
