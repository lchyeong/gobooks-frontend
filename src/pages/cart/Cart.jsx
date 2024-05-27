import { Link } from "react-router-dom";

function Cart() {
  return (
    <main className="min-h-[300px]">
      장바구니 페이지
      <Link className="block" to="/order">
        주문하기
      </Link>
    </main>
  );
}

export default Cart;
