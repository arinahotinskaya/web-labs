import { itemsApi } from '../api/item.api';
import { Item } from '../types/items.interfaces';
import { create } from 'zustand';

interface ItemsStoreType {
	items: Array<Item> | null;
	item?: Item | null;

	getItems: () => void;
	getItem: (id: number) => void;
}

export const useItems = create<ItemsStoreType>((set) => ({
	items: null,
	item: null,

	getItems: async () => {
		const { items } = await itemsApi.fetchItems();
		set({ items: items });
	},
	getItem: async (id) => {
		const { item } = await itemsApi.fetchItem(id);
		set({ item: item });
	},
}));
