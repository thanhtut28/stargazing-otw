import { format, parseISO } from 'date-fns'

export default function ProductDate({ dateString }: { dateString: string }) {
  if (!dateString) return null

  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL	dd / yyyy')}</time>
}
