export const getToken = () => {
	const token = JSON.parse(
		window.localStorage.getItem('token') || '{"token": ""}'
	);
	if (typeof token === 'string' && token.length) return token;

	return null;
};
