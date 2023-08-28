import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const postsSlice = createSlice({
  initialState: [
    {
      id: '1',
      title: 'test',
      desc: 'test2',
      date: sub(new Date(), { minutes: 10 }).toISOString(),
      reactions:{
        thumbsUp:0,
        happy:0,
        thumbsdown:0
      }
    },
  ],
  name: 'posts',
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    addPosts: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            user: userId,
            reactions:{
              thumbsUp:0,
              happy:0,
              thumbsdown:0
            }
          },
        }
      },
    },
    editPost: (state, action) => {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
})
export const { addPosts, editPost,reactionAdded } = postsSlice.actions
export default postsSlice.reducer
