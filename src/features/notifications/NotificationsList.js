import { useDispatch, useSelector } from 'react-redux'
import {
  allNotificationsRead,
  selectAllNotifictaions,
} from './notificationsSlice'
import { selectAllUsers } from '../users/usersSlice'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { useLayoutEffect } from 'react'
import classNames from 'classnames'

export const NotifiactionsList = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifictaions)
  const users = useSelector(selectAllUsers)

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })
  const renderedNotifications = notifications.map((notification) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === notification.user) || {
      name: 'unknown User',
    }
    const notificationClassName = classNames('notification', {
      new: notification.isNew,
    })
    return (
      <div key={notification.id} className={notificationClassName}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}
