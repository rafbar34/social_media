import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  fetchNotifications,
  selectAllNotifictaions,
} from '../features/notifications/notificationsSlice'

export const Navbar = () => {
  const dispatch = useDispatch()
  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }
  const notifications = useSelector(selectAllNotifictaions)
  console.log(notifications)
  const numUnreadNotifications = notifications.filter((n) => {
    return (!n.read )
  })
  let unreadNotificationsBadge
console.log(numUnreadNotifications.length)
  if (numUnreadNotifications.length > 0) {
    unreadNotificationsBadge = (
      <span className="badge">{numUnreadNotifications.length}</span>
    )
  }
  console.log(unreadNotificationsBadge)
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks"></div>
          <Link to="/">Posts</Link>
          <Link to="/add-form">add Post</Link>
          <Link to="/users">Users</Link>
          <Link to="/notifications">
            Notifications{unreadNotificationsBadge}
          </Link>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh notification
          </button>
        </div>
      </section>
    </nav>
  )
}
