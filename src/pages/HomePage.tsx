import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import { ProductCard } from '../components/ProductCard';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { danhSach, trangThai, loi } = useAppSelector((state) => state.products);
  const [tuKhoa, setTuKhoa] = useState<string>('');

  useEffect(() => {
    if (trangThai === 'idle') {
      dispatch(fetchProducts());
    }
  }, [trangThai, dispatch]);

  const danhSachDaLoc = danhSach.filter((sp) =>
    sp.title.toLowerCase().includes(tuKhoa.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm theo tên..."
          value={tuKhoa}
          onChange={(e) => setTuKhoa(e.target.value)}
          className="search-input"
        />
      </div>

      {trangThai === 'loading' && <p>Đang tải danh sách sản phẩm...</p>}
      {trangThai === 'failed' && <p className="error-text">Lỗi: {loi}</p>}

      {trangThai === 'succeeded' && (
        <>
          {danhSachDaLoc.length === 0 ? (
            <p>Không tìm thấy sản phẩm nào phù hợp.</p>
          ) : (
            <div className="product-grid">
              {danhSachDaLoc.map((sp) => (
                <ProductCard key={sp.id} sanPham={sp} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};