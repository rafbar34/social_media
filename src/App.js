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
import { UsersLister } from './features/users/UsersList'
import { UserPage } from './features/users/UsersPage'
import { NotifiactionsList } from './features/notifications/NotificationsList'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <PostsList />} />
          <Route exact path="/add-form" render={() => <AddPostForm />} />
          <Route
            exact
            path="/posts/:postId"
            render={() => <SinglePostPage />}
          />
          <Route exact path="/edit/:postId" render={() => <EditPostForm />} />
          <Route exact path="/users" render={() => <UsersLister />} />
          <Route exact path="/users/:userId" render={() => <UserPage />} />
          <Route exact path="/notifications" render={() => <NotifiactionsList />} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
