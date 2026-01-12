import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { dateAsDay } from './dateAsDay'

export const formatTimeAgo = (
  dateAl: Date,
  onlyMinutesAndHours: boolean = false,
): string => {
  const now = new Date()
  const diffInMs = now.getTime() - dateAl.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const diffInMonths = Math.floor(diffInDays / 30)

  if (diffInMinutes < 60) {
    if (diffInMinutes > 0) {
      return `il y a ${diffInMinutes} minute${sPluriel(diffInMinutes)}`
    } else {
      return `à l'instant`
    }
  } else if (diffInHours < 24) {
    return `il y a ${diffInHours} heure${sPluriel(diffInHours)}`
  } else {
    return onlyMinutesAndHours
      ? `le ${dateAsDay(dateAl)}`
      : diffInDays <= 30
        ? `il y a ${diffInDays} jour${sPluriel(diffInDays)}`
        : `il y a ${diffInMonths} mois`
  }
}
