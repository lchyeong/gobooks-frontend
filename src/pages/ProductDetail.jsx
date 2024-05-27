import { Link } from "react-router-dom";

function ProductDetail() {
  return (
    <main className="min-h-[300px]">
      상품 상세 페이지
      <Link className="block" to="/order">
        주문하기
      </Link>
    </main>
  );
}

export default ProductDetail;
