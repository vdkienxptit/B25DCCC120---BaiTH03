import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../../types';
import type { RootState } from '../../app/store';

interface TrangThaiGioHang {
  danhSachTrongGio: CartItem[];
}

const trangThaiBanDau: TrangThaiGioHang = {
  danhSachTrongGio: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: trangThaiBanDau,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const sanPhamMoi = action.payload;
      const sanPhamDaCo = state.danhSachTrongGio.find(
        (muc) => muc.sanPham.id === sanPhamMoi.id
      );

      if (sanPhamDaCo) {
        sanPhamDaCo.soLuong += 1;
      } else {
        state.danhSachTrongGio.push({ sanPham: sanPhamMoi, soLuong: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const idCanXoa = action.payload;
      state.danhSachTrongGio = state.danhSachTrongGio.filter(
        (muc) => muc.sanPham.id !== idCanXoa
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; soLuongMoi: number }>
    ) => {
      const { id, soLuongMoi } = action.payload;
      if (soLuongMoi <= 0) {
        state.danhSachTrongGio = state.danhSachTrongGio.filter(
          (muc) => muc.sanPham.id !== id
        );
      } else {
        const mucCanSua = state.danhSachTrongGio.find(
          (muc) => muc.sanPham.id === id
        );
        if (mucCanSua) {
          mucCanSua.soLuong = soLuongMoi;
        }
      }
    },

    clearCart: (state) => {
      state.danhSachTrongGio = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const tinhTongSoLuong = (state: RootState): number => {
  let tong = 0;
  for (const muc of state.cart.danhSachTrongGio) {
    tong += muc.soLuong;
  }
  return tong;
};

export const tinhTongTien = (state: RootState): number => {
  let tongTien = 0;
  for (const muc of state.cart.danhSachTrongGio) {
    tongTien += muc.sanPham.price * muc.soLuong;
  }
  return tongTien;
};

export default cartSlice.reducer;