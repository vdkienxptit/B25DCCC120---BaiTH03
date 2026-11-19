import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearCart, tinhTongTien } from '../features/cart/cartSlice';
import { useAuth } from '../contexts/AuthContext';

export const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const danhSachTrongGio = useAppSelector(
    (state) => state.cart.danhSachTrongGio
  );
  const tongTien = useAppSelector(tinhTongTien);

  const [daDatHang, setDaDatHang] = useState<boolean>(false);

  const xuLyDatHang = () => {
    dispatch(clearCart());
    setDaDatHang(true);
  };

  if (daDatHang) {
    return (
      <div className="success-box">
        <h2>Đặt hàng thành công!</h2>
        <p>Cảm ơn <strong>{user?.tenDangNhap}</strong> đã mua sắm tại ShopMini.</p>
        <Link to="/" className="btn-primary">
          Quay về trang chủ
        </Link>
      </div>
    );
  }

  if (danhSachTrongGio.length === 0) {
    return (
      <div className="empty-state">
        <h2>Không có sản phẩm nào để thanh toán</h2>
        <Link to="/" className="btn-primary">Mua sắm ngay</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2>Xác nhận thanh toán</h2>
      <p>Khách hàng: <strong>{user?.tenDangNhap}</strong></p>

      <div className="checkout-summary">
        {danhSachTrongGio.map(({ sanPham, soLuong }) => (
          <div key={sanPham.id} className="checkout-row">
            <span>{sanPham.title} (x{soLuong})</span>
            <span>${(sanPham.price * soLuong).toFixed(2)}</span>
          </div>
        ))}
        <hr />
        <h3>Tổng thanh toán: ${tongTien.toFixed(2)}</h3>
      </div>

      <button onClick={xuLyDatHang} className="btn-primary">
        Đặt hàng
      </button>
    </div>
  );
};