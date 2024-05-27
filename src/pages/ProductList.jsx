import { Link } from "react-router-dom";

function ProductList() {
  return (
    <main className="min-h-[300px]">
      상품 목록 페이지
      <Link className="block" to="/product/detail">
        상품상세
      </Link>
    </main>
  );
}

export default ProductList;
