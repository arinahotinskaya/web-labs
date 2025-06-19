const request = require('supertest');
const querystring = require('qs');
var app = require('../app').app;

it('Items list', (done) => {
	request(app)
		.get('/api/items/all')
		.expect(200)
		.end((err, res) => {
			itemsData = res._body.items;

			if (!res._body.items.length) {
				throw new Error('No Items');
			}

			console.log('Полученные данные:');
			console.log(res._body);
			done(err, res);
		});
});

it('Items count', (done) => {
	request(app)
		.get('/api/items/all')
		.expect(200)
		.end((err, res) => {
			itemsData = res._body.items;

			if (!res._body.items.some((item) => item.id === 10))
				throw new Error('Items length < 10');
			console.log('Полученные данные:');
			console.log(res._body);
			done(err, res);
		});
});
