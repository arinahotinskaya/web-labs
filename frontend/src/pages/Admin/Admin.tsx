import { Button, Form, Input, Layout, Typography, notification } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { itemsApi } from '../../api/item.api';

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

const Admin = () => {
	const [api, contextHolder] = notification.useNotification();
	const navigate = useNavigate();

	const openNotification = ({
		message,
		title,
	}: {
		title: string;
		message: string;
	}) => {
		api.open({
			message: title,
			description: message,
			duration: 0,
		});
	};

	const onFinish = async (values: {
		title: string;
		description: string;
		image: string;
		price: number;
	}) => {
		await itemsApi.createItem({
			title: values.title,
			description: values.description,
			price: values.price,
			image: values.image,
		});

		navigate('/');
	};

	const onFinishFailed = (errorInfo: any) => {
		openNotification({ message: errorInfo, title: 'Ошибка' });
	};

	return (
		<Layout.Content style={contentStyle}>
			<Typography.Title>Админ Панель</Typography.Title>
			{contextHolder}
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				title="Создать товар"
				autoComplete="off">
				<Form.Item
					label="Title"
					name="title"
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите название продукта!',
						},
					]}>
					<Input />
				</Form.Item>

				<Form.Item
					label="Описание"
					name="description"
					rules={[{ required: true, message: 'Пожалуйста введите описание!' }]}>
					<Input />
				</Form.Item>
				<Form.Item
					label="Цена"
					name="price"
					rules={[{ required: true, message: 'Пожалуйста введите цену!' }]}>
					<Input />
				</Form.Item>
				<Form.Item label="Картинка" name="image" rules={[{ required: false }]}>
					<Input />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 4, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Создать
					</Button>
				</Form.Item>
			</Form>
		</Layout.Content>
	);
};

export default Admin;
