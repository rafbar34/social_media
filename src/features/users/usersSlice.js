import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { apiSlice } from '../../api/apiSlice'

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')

  return response.data
})

const usersSlice = createSlice({
  initialState,
  name: 'users',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export default usersSlice.reducer

// export const selectAllUsers = (state) => state.users
// export const selectUsersById = (state, userId) =>
//   state.users.find((user) => user.id === userId)

export const selectUsersResult = apiSlice.endpoints.getUsers.select()
const emptyUsers = []

export const selectAllUsers = createSelector(
  selectUsersResult,
  (usersResult) => usersResult?.data ?? emptyUsers
)
export const selectUsersById = createSelector(
  selectAllUsers,
  (state, userId) => userId,
  (users, userId) =>
    users.find((user) => {
      return user.id === userId
    })
)
