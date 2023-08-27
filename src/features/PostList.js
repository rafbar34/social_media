import { useSelector } from 'react-redux'
import postsSlice from './postsSlice'

export const PostsList = () => {
  const posts = useSelector((state) => state.posts)
  console.log(posts)
  const redneredPosts = posts.map((post) => {
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>{[post.title]}</h3>
        <p className="post-content">{post.content}</p>
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
