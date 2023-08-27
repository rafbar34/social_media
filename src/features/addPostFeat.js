import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { addPosts } from './postsSlice'
export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const posts = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const AddPostHandle = (e) => {
    e.preventDefault()
    console.log(nanoid())
    dispatch(
      addPosts({
        id: nanoid(),
        title: title,
        content: content,
      })
    )
    console.log(posts)
  }

  return (
    <section>
      <h2>Add A New Post</h2>
      <form onSubmit={AddPostHandle}>
        <label htmlFor="postTitle">Post title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />

        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="submit">Save post</button>
      </form>
    </section>
  )
}
