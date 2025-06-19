import { Button, Form, Input, Layout, Typography, notification } from 'antd';
import React from 'react';
import { userApi } from '../../api/user.api';
import { useAuth } from '../../store/auth.store';
import { Link, useNavigate } from 'react-router-dom';

const contentStyle: React.CSSProperties = {
	textAlign: 'center',
	height: '90vh',
	flexGrow: 1,
	overflow: 'hidden',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
};

const RegisterPage = () => {
	const [api, contextHolder] = notification.useNotification();
	const signIn = useAuth((state) => state.signIn);
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

	const onFinish = async (values: { login: string; password: string }) => {
		const { token, userData } = await userApi.register(
			values.login,
			values.password
		);
		signIn(token, userData);
		navigate('/');
	};

	const onFinishFailed = (errorInfo: any) => {
		openNotification({ message: errorInfo, title: 'Ошибка' });
	};

	return (
		<Layout.Content style={contentStyle}>
			<Typography.Title> Регистрация</Typography.Title>
			{contextHolder}
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				title="Auth"
				autoComplete="off">
				<Form.Item
					label="Email"
					name="login"
					rules={[
						{ required: true, message: 'Пожалуйста введите имя пользователя!' },
					]}>
					<Input />
				</Form.Item>

				<Form.Item
					label="Пароль"
					name="password"
					rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}>
					<Input.Password />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 4, span: 16 }}>
					<Link to="/register">Нет аккаунта?</Link>
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 4, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Зарегистрироваться
					</Button>
				</Form.Item>
			</Form>
		</Layout.Content>
	);
};

export default RegisterPage;
