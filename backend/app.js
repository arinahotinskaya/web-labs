const express = require('express');
require('dotenv').config();
const cors = require('cors');
const sequelize = require('./config/db');

const router = require('./routes/');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		app.listen(PORT, () =>
			console.log(`App has been started on port: ${PORT} `)
		);
	} catch (e) {
		console.log('Server error ', e.message);
		process.exit(1);
	}
};

start();

module.exports.app = app;
