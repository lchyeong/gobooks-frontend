import { BrowserRouter, Route, Routes } from "react-router-dom";

import Cart from "./pages/Cart";
import Category from "./pages/manager/Category";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Order from "./pages/Order";
import Product from "./pages/manager/Product";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/join" element={<Join />}></Route>
          <Route path="/order" element={<Order />}></Route>
          <Route path="/product/list" element={<ProductList />}></Route>
          <Route path="/product/detail" element={<ProductDetail />}></Route>
          <Route path="/product/management" element={<Product />}></Route>
          <Route path="/category/management" element={<Category />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
