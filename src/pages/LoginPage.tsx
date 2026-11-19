import { useState, type FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface TrangThaiDieuHuong {
  trangTruocDo?: {
    pathname: string;
  };
}

export const LoginPage = () => {
  const [tenDangNhap, setTenDangNhap] = useState<string>('');
  const [matKhau, setMatKhau] = useState<string>('');
  const [thongBaoLoi, setThongBaoLoi] = useState<string>('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const trangThai = location.state as TrangThaiDieuHuong | null;
  const duongDanQuayLai = trangThai?.trangTruocDo?.pathname || '/';

  const xuLyDangNhap = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const thanhCong = login(tenDangNhap, matKhau);
    if (thanhCong) {
      navigate(duongDanQuayLai, { replace: true });
    } else {
      setThongBaoLoi('Tên đăng nhập không được trống và mật khẩu phải là 123456');
    }
  };

  return (
    <div className="auth-container">
      <h2>Đăng nhập ShopMini</h2>
      <form onSubmit={xuLyDangNhap} className="auth-form">
        <div className="form-group">
          <label htmlFor="username">Tên người dùng</label>
          <input
            id="username"
            type="text"
            value={tenDangNhap}
            onChange={(e) => setTenDangNhap(e.target.value)}
            placeholder="Nhập tên bất kỳ..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu (mặc định: 123456)</label>
          <input
            id="password"
            type="password"
            value={matKhau}
            onChange={(e) => setMatKhau(e.target.value)}
            placeholder="123456"
            required
          />
        </div>

        {thongBaoLoi && <p className="error-text">{thongBaoLoi}</p>}

        <button type="submit" className="btn-primary">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};