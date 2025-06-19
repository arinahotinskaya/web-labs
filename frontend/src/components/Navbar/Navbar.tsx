import { useCart } from '../../store/cart.store';
import { useAuth } from '../../store/auth.store';
import {
	DropboxOutlined,
	HomeOutlined,
	LogoutOutlined,
	ShopOutlined,
	ShoppingCartOutlined,
	TeamOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Badge, Layout, Menu, MenuProps, Typography } from 'antd';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
	const user = useAuth((state) => state.user);
	const signOut = useAuth((state) => state.signOut);
	const cart = useCart((state) => state.items);
	const navigate = useNavigate();

	const handleClick = useCallback((key: string) => {
		navigate(`/${key}`);
	}, []);

	const menuProps: MenuProps['items'] = [
		{
			label: 'Мои заказы',
			key: 'purchases',
			icon: <DropboxOutlined />,
			disabled: false,
			style: {
				display: user !== null ? 'block' : 'none',
			},
			onClick: ({ key }) => handleClick(key),
		},
		{
			label: 'Корзина',
			key: 'cart',
			icon: (
				<Badge count={cart.length} size={'small'}>
					<ShoppingCartOutlined />
				</Badge>
			),
			onClick: ({ key }) => handleClick(key),
		},
		{
			label: 'О нас',
			key: 'about-us',
			icon: <TeamOutlined />,
			onClick: ({ key }) => handleClick(key),
		},

		{
			label: 'Админ',
			key: 'admin',
			icon: <UserOutlined />,
			disabled: false,
			style: {
				display: user !== null && user.role ? 'block' : 'none',
			},
			onClick: ({ key }) => handleClick(key),
		},
		{
			label: 'Выйти',
			key: 'logout',
			icon: <LogoutOutlined />,
			disabled: false,
			style: {
				display: user !== null ? 'block' : 'none',
			},
			onClick: () => signOut(),
		},
	];

	return (
		<Layout.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Typography.Title
				style={{
					color: 'white',
					alignItems: 'center',
					display: 'flex',
					margin: 0,
				}}
				level={2}>
				<Link
					style={{
						color: 'white',
					}}
					to="/">
					MEGA SHOP
				</Link>
			</Typography.Title>
			<Menu
				theme="dark"
				mode="horizontal"
				defaultSelectedKeys={['2']}
				items={menuProps}
			/>
		</Layout.Header>
	);
};

export default Navbar;
