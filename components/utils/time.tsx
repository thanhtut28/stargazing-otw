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
    <time dateTime={time.toISOString()}>{format(time, 'Pp')}&#44; YGN</time>
  )
}
