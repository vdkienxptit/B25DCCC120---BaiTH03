import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '../../types';

interface TrangThaiSanPham {
  danhSach: Product[];
  trangThai: 'idle' | 'loading' | 'succeeded' | 'failed';
  loi: string | null;
}

const trangThaiBanDau: TrangThaiSanPham = {
  danhSach: [],
  trangThai: 'idle',
  loi: null,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const phanHoi = await fetch('https://fakestoreapi.com/products');
    if (!phanHoi.ok) {
      throw new Error('Không thể tải danh sách sản phẩm');
    }
    const duLieu = (await phanHoi.json()) as Product[];
    return duLieu;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: trangThaiBanDau,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.trangThai = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.trangThai = 'succeeded';
        state.danhSach = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.trangThai = 'failed';
        state.loi = action.error.message || 'Đã xảy ra lỗi khi gọi API';
      });
  },
});

export default productsSlice.reducer;