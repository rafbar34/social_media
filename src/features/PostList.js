import { useSelector } from 'react-redux'
import postsSlice from './postsSlice'
import { Link } from 'react-router-dom'
import { PostAuthor } from './postAuthor'
import { TimeAgo } from './users/TimeAgo'
import { ReactionButtons } from './ReactionsButtons'

export const PostsList = () => {
  const posts = useSelector((state) => state.posts)
  
  const orderedPosts = posts.slice().sort((a,b)=>{
    b.date.localeCompare(a.date)
  })


  const redneredPosts = orderedPosts.map((post) => {
   

    
    return (
      <article className="post-excerpt" key={post.id}>
        <Link to={`/${post.id}`}>
          {' '}
          <h3>{[post.title]}</h3>
        </Link>
        <p className="post-content">{post.content}</p>
        <PostAuthor userId={post.user} />
        <ReactionButtons post={post}/>
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
