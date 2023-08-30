import { useDispatch, useSelector } from 'react-redux'
import postsSlice, { fetchPosts, selectAllPosts } from './postsSlice'
import { Link } from 'react-router-dom'
import { PostAuthor } from './postAuthor'
import { TimeAgo } from './users/TimeAgo'
import { ReactionButtons } from './ReactionsButtons'
import { useEffect } from 'react'
import { Spinner } from '../components/Spinner'
export const PostsList = () => {
  const posts = useSelector(selectAllPosts)
  const dispatch = useDispatch()
  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    } else {
      return
    }
  }, [postStatus, dispatch])
  if (postStatus === 'loading') {
    return <Spinner text="loading" />
  }
  if (postStatus === 'failed') {
    return <span>error</span>
  }
  const orderedPosts = posts.slice().sort((a, b) => {
    b.date.localeCompare(a.date)
  })
  const redneredPosts = orderedPosts.map((post) => {
    return (
      <article className="post-excerpt" key={post.id}>
        <Link to={`/posts/${post.id}`}>
          {' '}
          <h3>{[post.title]}</h3>
        </Link>
        <p className="post-content">{post.content}</p>
        <PostAuthor userId={post.user} />
        <ReactionButtons post={post} />
        <TimeAgo timestamp={post.date} />
      </article>
    )
  })
  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {redneredPosts}
    </section>
  )
}
