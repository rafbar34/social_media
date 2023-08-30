import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { addNewPost } from './postsSlice'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { fetchUsers } from './users/usersSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const history = useHistory()
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [status, setStatus] = useState('idle')
  const checkStatus = useSelector((state) => state.status)
  const posts = useSelector((state) => state.posts)
  const users = useSelector((state) => state.users)

  const dispatch = useDispatch()

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])
  const canSave = [title, content, userId].every(Boolean) && status === 'idle'

  const userOptions = users.map((user) => {
    return <option value={user.id} key={user.id}>{user.name}</option>
  })
  console.log(userId)
  const AddPostHandle = async (e) => {
    e.preventDefault()
    if (canSave) {
      try {
        await dispatch(
          addNewPost({
            title,
            content,
            user: userId,
            date: new Date().toISOString(),
            reactions: {
              thumbsUp: 0,
              happy: 0,
              thumbsdown: 0,
            },
          })
        ).unwrap()
        setStatus('pending')
      } catch (err) {
        console.log(err)
      } finally {
        setStatus('idle')
        history.push('/')
      }
    }
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
        <label htmlFor="postAuthor">Author</label>
        <select id="postAuthor" onChange={onAuthorChanged}>
          <option value={''}></option>
          {userOptions}
        </select>
        <button disabled={!canSave} type="submit">
          Save post
        </button>
      </form>
    </section>
  )
}
