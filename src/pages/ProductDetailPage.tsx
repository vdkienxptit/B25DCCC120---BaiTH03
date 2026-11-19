import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';
import type { Product } from '../types';

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const sanPhamTrongKho = useAppSelector((state) =>
    state.products.danhSach.find((sp) => sp.id === Number(id))
  );

  const [sanPhamTuApi, setSanPhamTuApi] = useState<Product | null>(null);
  const [dangTai, setDangTai] = useState<boolean>(false);
  const [loi, setLoi] = useState<string | null>(null);

  useEffect(() => {
    if (sanPhamTrongKho || !id) {
      return;
    }

    const taiChiTietSanPham = async () => {
      try {
        setDangTai(true);
        const phanHoi = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!phanHoi.ok) {
          throw new Error('Không tìm thấy sản phẩm');
        }
        const duLieu = (await phanHoi.json()) as Product;
        setSanPhamTuApi(duLieu);
      } catch (err) {
        setLoi(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
      } finally {
        setDangTai(false);
      }
    };

    taiChiTietSanPham();
  }, [id, sanPhamTrongKho]);

  const sanPham = sanPhamTrongKho || sanPhamTuApi;

  if (dangTai) return <p>Đang tải chi tiết sản phẩm...</p>;
  if (loi || !sanPham) {
    return (
      <div>
        <p>{loi || 'Sản phẩm không tồn tại'}</p>
        <Link to="/">Quay lại trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <Link to="/" className="back-link">← Quay lại danh sách</Link>
      <div className="detail-content">
        <img
          src={sanPham.image}
          alt={sanPham.title}
          className="detail-image"
        />
        <div className="detail-info">
          <span className="badge">{sanPham.category}</span>
          <h1>{sanPham.title}</h1>
          <h2 className="detail-price">${sanPham.price.toFixed(2)}</h2>
          <p className="detail-desc">{sanPham.description}</p>
          <button
            onClick={() => dispatch(addToCart(sanPham))}
            className="btn-primary"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};