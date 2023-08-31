import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { PostAuthor } from './postAuthor'
import { TimeAgo } from './users/TimeAgo'
import { selectById } from './postsSlice'
import { useGetPostQuery } from '../api/apiSlice'
import { Spinner } from '../components/Spinner'

export const SinglePostPage = () => {
  const { postId } = useParams()

  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId)

  if (isFetching) {
    return <Spinner text="loading..." />
  } else if (isSuccess) {
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
}
