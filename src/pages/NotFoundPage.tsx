import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="empty-state">
      <h1>404</h1>
      <p>Trang bạn tìm kiếm không tồn tại.</p>
      <Link to="/" className="btn-primary">
        Về trang chủ
      </Link>
    </div>
  );
};