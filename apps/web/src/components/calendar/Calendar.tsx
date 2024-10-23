import ReactCalendar from 'react-calendar'

import { CalendarProps } from 'react-calendar/src/Calendar'

import classNames from 'classnames'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import { dateFormatter } from '@app/web/utils/formatDate'
import styles from './Calendar.module.css'

const today = dateAsIsoDay(new Date())

const tileClassName: CalendarProps['tileClassName'] = ({ date }) => {
  if (dateAsIsoDay(date) === today) {
    return styles.today
  }
  return ''
}

// date-fn date (vendredi) -> V
const dayLetterFormatter = dateFormatter('E')

const formatShortWeekday: CalendarProps['formatShortWeekday'] = (
  _locale,
  date,
) => dayLetterFormatter(date).charAt(0).toUpperCase()

const Calendar = ({
  className,
  tileClassName: tileClassNameProperty,
  ...calendarProps
}: CalendarProps) => (
  <ReactCalendar
    className={classNames(styles.calendar, className)}
    tileClassName={tileClassNameProperty ?? tileClassName}
    formatShortWeekday={formatShortWeekday}
    {...calendarProps}
  />
)

export default Calendar
