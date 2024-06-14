import { format } from 'date-fns'
import { useEffect, useState } from 'react'

export default function Time() {
  const [time, setTime] = useState<Date>(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <time dateTime={getMyanmarTime(time).toDateString()}>
      {format(getMyanmarTime(time), 'Pp')}&#44; YGN
    </time>
  )
}
function getMyanmarTime(now: Date) {
  const utcOffset = 6.5 * 60 // Myanmar is UTC+6:30

  // Convert current time to UTC
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60000

  // Add Myanmar offset
  const myanmarTime = new Date(utcTime + utcOffset * 60000)

  return myanmarTime
}
