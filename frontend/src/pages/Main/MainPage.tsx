import ListItem from '../../components/List/ListItem';
import Carousel from '../../components/Carousel/Carousel';
import { Col, Grid, Layout, Row, Typography } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useItems } from '../../store/items.store';
import useAsyncEffect from 'use-async-effect';

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

const MainPage = () => {
	const getItems = useItems((state) => state.getItems);
	const items = useItems((state) => state.items);

	const fetchItems = useCallback(async () => {
		await getItems();
	}, [getItems]);

	useAsyncEffect(async () => {
		await fetchItems();
	}, [fetchItems]);

	return (
		<Layout.Content style={contentStyle}>
			<Typography.Title>Главная</Typography.Title>
			<Row gutter={[40, 16]} wrap>
				{items !== null &&
					items.map((item, index) => {
						return <ListItem key={index} item={item} />;
					})}
			</Row>
		</Layout.Content>
	);
};

export default MainPage;
