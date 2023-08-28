import { formatDistance, parseISO } from 'date-fns'

export const TimeAgo = ({ timestamp }) => {
  let timeAgo = ''

  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeroid = formatDistance(date, new Date())
    timeAgo = `${timePeroid} ago`
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}
