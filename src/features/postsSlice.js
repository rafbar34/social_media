import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { client } from '../api/client'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')

  return response.data
})

const postsSlice = createSlice({
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
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
        state.posts.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            user: userId,
            reactions: {
              thumbsUp: 0,
              happy: 0,
              thumbsdown: 0,
            },
          },
        }
      },
    },
    editPost: (state, action) => {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.posts = state.posts.concat(action.payload)
    })
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'error'
      state.error = action.error.message
    })
  },
})
export const { addPosts, editPost, reactionAdded } = postsSlice.actions

export const selectAllPosts = (state) => state.posts.posts
export const selectById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId)

export default postsSlice.reducer
