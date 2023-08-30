import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    console.log("test")
    const allNotification = selectAllNotifictaions(getState())
    const [latestNotification] = allNotification
    const latestTimestamp = latestNotification ? latestNotification.date : ''
console.log(latestTimestamp)
    const response = await client.get(
      `/fakeApi/notifications`
    )
    return response.data
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(...action.payload)
      state.sort((a, b) => b.date.localeCompare(a.date))
    })
  },
})


export default notificationsSlice.reducer
export const selectAllNotifictaions = state =>state.notifications