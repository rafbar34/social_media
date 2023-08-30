import { useSelector } from 'react-redux'
import { selectAllPosts, selectById } from '../postsSlice'
import { useParams } from 'react-router-dom'
import { selectUsersById } from './usersSlice'
import { Link } from 'react-router-dom'
import { NotifiactionsList } from '../notifications/NotificationsList'

export const UserPage = ({ match }) => {
  const { userId } = useParams()

  const user = useSelector((state) => selectUsersById(state, userId))

  const postsForUser = useSelector((state) => {
    const allPosts = selectAllPosts(state)
    return allPosts.filter((post) => post.user === userId)
  })
  console.log(postsForUser)
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
