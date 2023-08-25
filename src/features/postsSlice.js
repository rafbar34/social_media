import { createSlice } from '@reduxjs/toolkit'

const postsSlice = createSlice({
  initialState: [{ id: '1', title: 'test', desc: 'test2' }],
  name: 'posts',
  reducers: {},
})

export default postsSlice.reducer
