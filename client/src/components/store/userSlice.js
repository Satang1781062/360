import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 'HEalthyshop',
  user: [],
  it: []
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state) => {
      state.value = 'Login นะครับ'
    },
    logout: (state) => {  // แก้ไขคำผิดที่นี่ คิดว่าคุณตั้งใจให้เป็น 'logout'
      state.value = 'LogOut นะครับ'
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// ตัวสร้าง action จะถูกสร้างขึ้นสำหรับแต่ละ reducer function
export const { login, logout, incrementByAmount } = userSlice.actions // ใช้ 'userSlice' ที่นี่

export default userSlice.reducer
