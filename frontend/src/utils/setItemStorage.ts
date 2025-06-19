export const setItemStorage = (storageName: string, data: any) => {
	window.localStorage.setItem(storageName, JSON.stringify(data));
};

export const removeItemStorage = (storageName: string) => {
	window.localStorage.removeItem(storageName);
};
