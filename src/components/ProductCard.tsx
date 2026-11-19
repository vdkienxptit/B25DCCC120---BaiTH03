import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';

interface PropsTheSanPham {
  sanPham: Product;
}

export const ProductCard = ({ sanPham }: PropsTheSanPham) => {
  const dispatch = useAppDispatch();

  const xuLyThemVaoGio = () => {
    dispatch(addToCart(sanPham));
  };

  return (
    <div className="product-card">
      <Link to={`/products/${sanPham.id}`} className="product-link">
        <img
          src={sanPham.image}
          alt={sanPham.title}
          className="product-image"
        />
        <h3 className="product-title">{sanPham.title}</h3>
      </Link>
      <p className="product-category">{sanPham.category}</p>
      <p className="product-price">${sanPham.price.toFixed(2)}</p>
      <div className="product-actions">
        <Link to={`/products/${sanPham.id}`} className="btn-outline">
          Chi tiết
        </Link>
        <button onClick={xuLyThemVaoGio} className="btn-primary">
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};