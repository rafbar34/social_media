import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { PostAuthor } from './postAuthor'
import { TimeAgo } from './users/TimeAgo'
import { selectById } from './postsSlice'

export const SinglePostPage = () => {
  const { postId } = useParams()
  const post = useSelector((state)=>selectById(state, postId))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }
  return (
    <section>
      <article>
        <h2>{post.title}</h2>
        <p className="post-content">{post.desc}</p>
        <p>
          <PostAuthor userId={post.user} />
        </p>
        <p>
          <TimeAgo timestamp={post.date} />
        </p>
      </article>
      <Link to={`/edit/${postId}`}>Edit</Link>
    </section>
  )
}
