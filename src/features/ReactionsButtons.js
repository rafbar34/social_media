import { useDispatch } from 'react-redux'
import { reactionAdded } from './postsSlice'

export const reactionEmoji = {
  thumbsUp: '👍',
  thumbDown: ' 👎',
  happy: '😃',
}

export const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch()
  console.log(Object.entries(reactionEmoji))
  const ReactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    console.log(post.reactions)
    return (
      <button
        onClick={() => {
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }}
        key={name}
        type="button"
        className="muted-butten reaction-button"
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })
  return <div>{ReactionButtons}</div>
}
