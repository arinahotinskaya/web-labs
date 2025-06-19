import { Descriptions, Layout } from 'antd';
import React, { useState, useCallback } from 'react';
import { itemsApi } from '../../api/item.api';
import { useParams } from 'react-router-dom';
import useAsyncEffect from 'use-async-effect';
import { Item as ItemI } from '../../types/items.interfaces';

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

const ItemPage = () => {
	const [item, setItem] = useState<ItemI>();
	const { id } = useParams();

	const fetchItem = useCallback(async () => {
		const data = await itemsApi.fetchItem(Number(id));
		setItem(data);
	}, []);

	useAsyncEffect(async () => {
		await fetchItem();
	}, [fetchItem]);

	return (
		<Layout.Content style={contentStyle}>
			{item && (
				<Descriptions title={item.title}>
					<Descriptions.Item>
						<img
							alt="example"
							src={
								item.image !== null
									? item.image
									: '../../../public/assets/placeholder.png'
							}
						/>
					</Descriptions.Item>
					<Descriptions.Item label="Описание">
						{item.description}
					</Descriptions.Item>
					<Descriptions.Item label="Цена">{item.price}</Descriptions.Item>
				</Descriptions>
			)}
		</Layout.Content>
	);
};

export default ItemPage;
