import { Item } from 'src/types/items.interfaces';
import http from './base-api';

export interface ItemsResponse {
	items: Array<Item>;
}

export interface ItemResponse {
	item: Item;
}

const fetchItems = async (): Promise<ItemsResponse> => {
	const { data: items } = await http.get<ItemsResponse>('/items/all');

	return items;
};

const fetchItem = async (id: number): Promise<Item> => {
	const { data } = await http.get<{ item: Item }>(`/items/get/${id}`);

	return data.item;
};

const createItem = async ({
	title,
	description,
	price,
	image,
}: {
	title: string;
	description?: string;
	price: number;
	image: string;
}) => {
	await http.post('/items/create', {
		title,
		description,
		price,
		image,
	});
};

export const itemsApi = {
	fetchItems,
	fetchItem,
	createItem,
};
