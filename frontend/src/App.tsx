import 'antd/dist/reset.css';
import { Layout } from 'antd';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/Auth/AuthPage';
import { hydrateAuth, useAuth } from './store/auth.store';
import { useEffect } from 'react';
import MainPage from './pages/Main/MainPage';
import CartPage from './pages/Cart/CartPage';
import RegisterPage from './pages/Register/RegisterPage';
import UserPurchases from './pages/UserPurchases/UserPurchases';
import Admin from './pages/Admin/Admin';
import ItemPage from './pages/Item/ItemPage';

function App() {
	const user = useAuth((state) => state.user);

	useEffect(() => {
		hydrateAuth();
	}, []);
	return (
		<div className="App">
			<BrowserRouter>
				<Layout style={{ display: 'flex', flexDirection: 'column' }}>
					<Navbar />
					<Routes>
						<Route path="/" element={<MainPage />} />
						<Route path="/auth" element={<AuthPage />} />
						<Route path="/cart" element={<CartPage />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/item/:id" element={<ItemPage />} />
						{user !== null && user.role && (
							<Route path="/admin" element={<Admin />} />
						)}
						{user !== null && (
							<Route path="/purchases" element={<UserPurchases />} />
						)}
					</Routes>
					<Layout.Footer style={{ color: 'white', backgroundColor: '#001529' }}>
						(c) Арина Хотинская 2025
					</Layout.Footer>
				</Layout>
			</BrowserRouter>
		</div>
	);
}

export default App;
