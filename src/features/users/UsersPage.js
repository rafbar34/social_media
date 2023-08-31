import { useSelector } from 'react-redux'
import { selectAllPosts, selectById, selectPostsByUser } from '../postsSlice'
import { useParams } from 'react-router-dom'
import { selectUsersById } from './usersSlice'
import { Link } from 'react-router-dom'
import { NotifiactionsList } from '../notifications/NotificationsList'

export const UserPage = ({ match }) => {
  const { userId } = useParams()

  const user = useSelector((state) => selectUsersById(state, userId))

  const postsForUser = useSelector((state) => {
    selectPostsByUser(state,userId)
  })
  const postTitles = postsForUser.map((post) => {
    return (
      <li key={post.id}>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </li>
    )
  })

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  )
}
