import { createSlice } from '@reduxjs/toolkit'

const postsSlice = createSlice({
  initialState: [{ id: '1', title: 'test', desc: 'test2' }],
  name: 'posts',
  reducers: {
    addPosts: (state, action) => {
      state.push(action.payload)
    },
  },
})
export const { addPosts } = postsSlice.actions
export default postsSlice.reducer
