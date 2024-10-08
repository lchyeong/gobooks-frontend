import { Route, Routes } from 'react-router-dom';

import Cart from './pages/cart/Cart';
import Category from './pages/manager/category/Category';
import Join from './pages/join/Join';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import ManagerDashboard from './pages/manager/ManagerPanel';
import MyPagePanel from './pages/myPage/MyPagePanel';
import Order from './pages/order/Order';
import ProductAdd from './pages/manager/product/ProductAdd';
import ProductDetail from './pages/productDetail/ProductDetail';
import ProductEdit from './pages/manager/product/ProductEdit';
import ProductList from './pages/productList/ProductList';
import UserManagement from './pages/manager/users/UserManagement';
import OrdersComplete from './pages/order/OrdersComplete';
import OrderList from './pages/order/OrderList';
import { PrivateRoute } from './router/PrivateRoute';


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route element={<PrivateRoute />}>
        <Route path="/order" element={<Order />} />
        <Route path="/order/complete" element={<OrdersComplete />} />
        <Route path="/order/:userId" element={<OrderList />} />
      </Route>
      <Route path="/product/list/:categoryId" element={<ProductList />} />
      <Route path="/product/detail/:id" element={<ProductDetail />} />
      <Route path="/admin/product/add" element={<ProductAdd />} />
      <Route path="/admin/product/edit/:id" element={<ProductEdit />} />
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/admin/category" element={<Category />} />
      <Route path="/admin/manager" element={<ManagerDashboard />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/myPage" element={<MyPagePanel />} />
    </Routes>
  );
};

export default Router;