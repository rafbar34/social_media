import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '0', name: 'Julie' },
  { id: '1', name: 'Mobby' },
  { id: '2', name: 'Jack' },
  { id: '3', name: 'Turtle' },
]

const usersSlice = createSlice({
  initialState,
  name: 'users',
  reducers: {},
})

export default usersSlice.reducer
