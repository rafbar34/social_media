import { nanoid } from '@reduxjs/toolkit'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { editPost } from './postsSlice'

export const EditPostForm = () => {
  const { postId } = useParams()
const history = useHistory()
  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  )

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.desc)
  const dispatch = useDispatch()
  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)

  const EditPostHandle = (e) => {
    e.preventDefault()
    console.log(nanoid())
    dispatch(
      editPost({
        id: postId,
        title: title,
        content: content,
      })
    )
    history.push(`/${postId}`)
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
        <button type="submit">Save post</button>
      </form>
    </section>
  )
}


