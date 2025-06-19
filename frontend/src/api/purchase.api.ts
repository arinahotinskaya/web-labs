import { User } from '../types/user.interfaces';
import { Item } from '../types/items.interfaces';
import http from './base-api';

interface PreparedItems {
	item_id: number;
	user_id: number;
}

export interface Purchases {
	id: number;
	item_id: number;
	user_id: number;
	item: Item;
}

function prepareItems(items: Array<Item>, user: User): Array<PreparedItems> {
	const final: Array<PreparedItems> = [];
	items.forEach((item) => {
		final.push({ item_id: item.id, user_id: user.id });
	});
	return final;
}

const purchaseItems = async (items: Array<Item>, user: User) => {
	const prepared = prepareItems(items, user);

	const response = await http.post('/purchase/create', {
		purchases: prepared,
	});

	return response;
};

const fetchUserPurchases = async (user: User): Promise<Array<Purchases>> => {
	const response = await http.get<{ purchase: Array<Purchases> }>(
		`/purchase/user/${user.id}`
	);

	return response.data.purchase;
};

export const purchasesApi = {
	purchaseItems,
	fetchUserPurchases,
};
