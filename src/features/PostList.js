import { useSelector } from 'react-redux'
import postsSlice from './postsSlice'

export const PostsList = () =>{
    const test = useSelector(state=>state.posts)
    console.log(test)
    return(
        <div>

        </div>
    )
}