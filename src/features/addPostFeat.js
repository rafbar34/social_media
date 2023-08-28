import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { addPosts } from './postsSlice'
import { useEffect } from 'react'
import {useHistory} from 'react-router-dom'
export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const history = useHistory()
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const posts = useSelector((state) => state.posts)
  const users = useSelector((state) => state.users)

  const dispatch = useDispatch()
  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  const AddPostHandle = (e) => {
    e.preventDefault()
    console.log(nanoid())
    dispatch(addPosts(title, content, userId))
    history.push('/')
  }

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const userOptions = users.map((user) => {
    return <option key={user.id}>{user.name}</option>
  })

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
        <label htmlFor="postAuthor">Author</label>
        <select id="postAuthor" onChange={onAuthorChanged}>
          <option value={''}></option>
          {userOptions}
        </select>
        <button disabled={!canSave} type="submit">Save post</button>
      </form>
    </section>
  )
}
