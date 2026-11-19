import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  removeFromCart,
  updateQuantity,
  tinhTongTien,
  tinhTongSoLuong,
} from '../features/cart/cartSlice';

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const danhSachTrongGio = useAppSelector(
    (state) => state.cart.danhSachTrongGio
  );
  const tongSoLuong = useAppSelector(tinhTongSoLuong);
  const tongTien = useAppSelector(tinhTongTien);

  if (danhSachTrongGio.length === 0) {
    return (
      <div className="empty-state">
        <h2>Giỏ hàng của bạn đang trống</h2>
        <Link to="/" className="btn-primary">Tiếp tục mua sắm</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2>Giỏ hàng ({tongSoLuong} sản phẩm)</h2>

      <div className="cart-list">
        {danhSachTrongGio.map(({ sanPham, soLuong }) => (
          <div key={sanPham.id} className="cart-item">
            <img
              src={sanPham.image}
              alt={sanPham.title}
              className="cart-item-img"
            />
            <div className="cart-item-info">
              <Link to={`/products/${sanPham.id}`}>{sanPham.title}</Link>
              <p>${sanPham.price.toFixed(2)}</p>
            </div>

            <div className="cart-item-controls">
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({ id: sanPham.id, soLuongMoi: soLuong - 1 })
                  )
                }
              >
                -
              </button>
              <span>{soLuong}</span>
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({ id: sanPham.id, soLuongMoi: soLuong + 1 })
                  )
                }
              >
                +
              </button>
            </div>

            <p className="cart-item-subtotal">
              ${(sanPham.price * soLuong).toFixed(2)}
            </p>

            <button
              onClick={() => dispatch(removeFromCart(sanPham.id))}
              className="btn-danger"
            >
              Xóa
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Tổng tiền: ${tongTien.toFixed(2)}</h3>
        <button
          onClick={() => navigate('/checkout')}
          className="btn-primary"
        >
          Tiến hành thanh toán
        </button>
      </div>
    </div>
  );
};