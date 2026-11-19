import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useAppSelector } from '../app/hooks';
import { tinhTongSoLuong } from '../features/cart/cartSlice';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const tongSoLuong = useAppSelector(tinhTongSoLuong);

  return (
    <header className="header">
      <Link to="/" className="logo">ShopMini</Link>

      <nav className="nav-actions">
        <Link to="/cart">Giỏ hàng ({tongSoLuong})</Link>

        <button onClick={toggleTheme}>
          {theme === 'light' ? 'Chế độ tối' : 'Chế độ sáng'}
        </button>

        {user ? (
          <>
            <span>Xin chào, <strong>{user.tenDangNhap}</strong></span>
            <button onClick={logout}>Đăng xuất</button>
          </>
        ) : (
          <Link to="/login">Đăng nhập</Link>
        )}
      </nav>
    </header>
  );
};