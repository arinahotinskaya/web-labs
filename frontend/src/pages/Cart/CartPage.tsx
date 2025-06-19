import { useNavigate } from 'react-router-dom';
import { purchasesApi } from '../../api/purchase.api';
import { useAuth } from '../../store/auth.store';
import { useCart } from '../../store/cart.store';
import { Button, Layout, Table, Typography } from 'antd';
import React from 'react';

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

const CartPage = () => {
	const items = useCart((state) => state.items);
	const clearCart = useCart((state) => state.clearCart);
	const user = useAuth((state) => state.user);
	const navigate = useNavigate();

	const handleClick = async () => {
		if (!items.length) return;
		if (user === null) {
			navigate('/auth');
			return;
		}
		const data = await purchasesApi.purchaseItems(items, user);
		if (data.status === 200) {
			clearCart();
			navigate('/');
		}
	};

	return (
		<Layout.Content style={contentStyle}>
			<Typography.Title>Корзина</Typography.Title>
			<Table dataSource={items} rowKey={'id'} columns={columns} />
			<Button onClick={() => handleClick()}>Оплатить</Button>
		</Layout.Content>
	);
};

export default CartPage;
