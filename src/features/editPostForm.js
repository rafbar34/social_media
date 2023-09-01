import { nanoid } from '@reduxjs/toolkit'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { editPost, selectById } from './postsSlice'
import { useEditPostMutation, useGetPostQuery } from '../api/apiSlice'
import { Spinner } from '../components/Spinner'

export const EditPostForm = () => {
  const { postId } = useParams()
  const history = useHistory()
  const { data: post } = useGetPostQuery(postId)
  const [updatePost, { isLoading }] = useEditPostMutation()
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.desc)
  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const EditPostHandle = async (e) => {
    e.preventDefault()
    if (title && content) {
      await updatePost({
        id: postId,
        title: title,
        content: content,
      })

      history.push(`/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form onSubmit={EditPostHandle}>
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
        {!isLoading ? <button type="submit">Save post</button> : <Spinner />}
      </form>
    </section>
  )
}
