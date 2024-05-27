import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="border-b-[3px] p-5 flex justify-between">
      <ul className="flex gap-[10px]">
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/product/list">상품목록</Link>
        </li>
      </ul>
      <ul className="flex gap-[10px]">
        <li>
          <Link to="/login">로그인</Link>
        </li>
        <li>
          <Link to="/join">회원가입</Link>
        </li>
        <li>
          <Link to="/cart">장바구니</Link>
        </li>
        <li>
          <Link to="/category/management">관리자</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
