import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Navbar } from './app/Navbar'
import { PostsList } from './features/PostList'
import { AddPostForm } from './features/addPostFeat'
import { SinglePostPage } from './features/SinglePostPage'
import { EditPostForm } from './features/editPostForm'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <PostsList />} />
          <Route exact path="/add-form" render={() => <AddPostForm />} />
          <Route exact path="/:postId" render={() => <SinglePostPage />} />
          <Route exact path="/edit/:postId" render={() => <EditPostForm />} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
