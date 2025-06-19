import { produce } from 'immer';
import { Item } from '../types/items.interfaces';
import { create } from 'zustand';
import { objectInArray } from '../utils/arrayUtils';

interface CartStoreProps {
	items: Array<Item>;
	totalSum: () => number;
	itemInArray: (item: Item) => boolean;
	addItem: (item: Item) => void;
	removeItem: (item: Item) => void;
	clearCart: () => void;
}

export const useCart = create<CartStoreProps>((set, get) => ({
	items: [],

	itemInArray: (item) => {
		return objectInArray(item, get().items, 'id');
	},

	totalSum: () => {
		let sum = 0;
		get().items.forEach((item) => {
			sum += item.price;
		});
		return sum;
	},

	addItem: (item) => {
		set(
			produce((draft) => {
				draft.items.push(item);
			})
		);
	},
	removeItem: (item) => {
		set(
			produce((draft) => {
				draft.items.pop(item);
			})
		);
	},

	clearCart: () => {
		set({ items: [] });
	},
}));
