import { Button, Card, Col } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useEffect, useState } from 'react';
import { Item } from '../../types/items.interfaces';
import { useCart } from '../../store/cart.store';
import { useNavigate } from 'react-router-dom';

interface ListItemProps {
	item: Item;
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
	const addItem = useCart((state) => state.addItem);
	const removeItem = useCart((state) => state.removeItem);
	const isInArray = useCart((state) => state.itemInArray);
	const items = useCart((state) => state.items);
	const navigate = useNavigate();
	const [showAddButton, setShow] = useState(false);

	useEffect(() => {
		setShow(!isInArray(item));
	}, [item, items]);

	return (
		<Col flex={'auto'}>
			<Card
				onClick={() => navigate(`/item/${item.id}`)}
				hoverable
				style={{ width: 240 }}
				cover={
					<img
						alt="example"
						src={item.image !== null ? item.image : 'assets/placeholder.png'}
					/>
				}>
				<Meta title={item.title} description={`${item.price} руб`} />
				<br />
				{showAddButton && (
					<Button
						onClick={(e) => {
							e.stopPropagation();
							addItem(item);
						}}>
						Add to cart
					</Button>
				)}
				{!showAddButton && (
					<Button
						danger
						onClick={(e) => {
							e.stopPropagation();
							removeItem(item);
						}}>
						Remove
					</Button>
				)}
			</Card>
		</Col>
	);
};

export default ListItem;
