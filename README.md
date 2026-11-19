ShopMini - Bài tập thực hành 03 (TH01)

Họ và tên: Vũ Đức Kiên
Mã sinh viên: B25DCCC120
Repository: https://github.com/vdkienxptit/B25DCCC120---BaiTH03

Phân chia quản lý State và Lý do

Local State (useState)
Dữ liệu lưu trữ:

Từ khóa tìm kiếm sản phẩm (tuKhoa) tại trang chủ (HomePage).

Dữ liệu nhập liệu trên form đăng nhập và thông báo lỗi (tenDangNhap, matKhau, thongBaoLoi) tại trang đăng nhập (LoginPage).

Trạng thái xác nhận đặt hàng thành công (daDatHang) tại trang thanh toán (CheckoutPage).

Dữ liệu chi tiết 1 sản phẩm lẻ khi tải trực tiếp trang chi tiết (sanPhamTuApi) tại ProductDetailPage.

Lý do: Đây là các dữ liệu mang tính cục bộ, chỉ phục vụ hiển thị hoặc tương tác tạm thời bên trong chính component đó, không cần chia sẻ cho các component khác và tự động giải phóng khi người dùng rời khỏi trang.

Context API (ThemeContext, AuthContext)
Dữ liệu lưu trữ:

Chế độ giao diện sáng/tối (theme và hàm toggleTheme) trong ThemeContext.

Thông tin tài khoản người dùng đang đăng nhập (user cùng các hàm login, logout) trong AuthContext.

Lý do: Đây là các trạng thái toàn cục cần truy cập ở nhiều nơi trong ứng dụng (Header, ProtectedRoute, LoginPage, CheckoutPage) nhưng tần suất thay đổi thấp và logic cập nhật đơn giản. Sử dụng Context API giúp chia sẻ dữ liệu gọn nhẹ, tránh việc truyền props qua nhiều cấp trung gian mà không cần cấu hình phức tạp như Redux.

Redux Toolkit (productsSlice, cartSlice)
Dữ liệu lưu trữ:

Danh sách sản phẩm lấy từ API kèm trạng thái gọi API (loading, succeeded, failed) và thông báo lỗi trong productsSlice.

Danh sách sản phẩm trong giỏ hàng (items) trong cartSlice.

Lý do: Dữ liệu sản phẩm và giỏ hàng được dùng chung và đồng bộ xuyên suốt nhiều màn hình (Header, HomePage, ProductDetailPage, CartPage, CheckoutPage), đồng thời cần xử lý tác vụ bất đồng bộ (createAsyncThunk) và các nghiệp vụ cập nhật, tính toán phức tạp như thêm sản phẩm, tăng giảm số lượng, xóa từng món, xóa toàn bộ giỏ hàng sau khi đặt, tính tổng số lượng và tổng tiền thông qua selector.

Hướng dẫn chạy dự án

Cài đặt thư viện: npm install

Chạy môi trường phát triển: npm run dev