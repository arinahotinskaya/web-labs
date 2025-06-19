import useAsyncEffect from 'use-async-effect';
import { useAuth } from '../../store/auth.store';
import React, { useCallback, useState } from 'react';
import { Purchases, purchasesApi } from '../../api/purchase.api';
import { useNavigate } from 'react-router-dom';
import { Layout, Table, Typography } from 'antd';
import { Item } from '../../types/items.interfaces';

const contentStyle: React.CSSProperties = {
	textAlign: 'center',
	height: '90vh',
	flexGrow: 1,
	overflowX: 'hidden',
	display: 'flex',
	width: '100%',
	flexDirection: 'column',
	padding: '10px 12px',
	gap: '40px',
};

const columns = [
	{
		title: 'Наименование',
		dataIndex: 'title',
		key: 'title',
	},
	{
		title: 'Описание',
		dataIndex: 'description',
		key: 'description',
	},
	{
		title: 'Цена',
		dataIndex: 'price',
		key: 'price',
	},
];

const UserPurchases = () => {
	const user = useAuth((state) => state.user);
	const [purchases, setPurchases] = useState<Array<Item>>([]);
	const navigate = useNavigate();

	const fetchPurchases = useCallback(async () => {
		if (user === null) {
			navigate('/');
			return;
		}
		const response = await purchasesApi.fetchUserPurchases(user);
		const array: Array<Item> = [];
		response.forEach((item) => {
			array.push(item.item);
		});
		setPurchases(array);
	}, []);

	useAsyncEffect(async () => {
		await fetchPurchases();
	}, [fetchPurchases]);

	return (
		<Layout.Content style={contentStyle}>
			<Typography.Title>Мои заказы</Typography.Title>
			<Table dataSource={purchases} rowKey={'id'} columns={columns} />
		</Layout.Content>
	);
};

export default UserPurchases;
