import { prismaClient } from '@app/web/prismaClient'
// Import des fonctions de détection d'anglais depuis le fichier des profils
import { isProbablyEnglish } from '@app/web/server/profiles/suspiciousProfileDetection'
import { deleteProfile } from '@app/web/server/rpc/profile/deleteProfile'
import { DeletedReason } from '@prisma/client'

/**
 * Détecte si une base est suspecte selon les critères définis :
 * - Base créée dans les 60 dernières minutes
 * - Description contient de l'anglais
 * - Description contient simplement un lien
 * - Base contient un site internet ou un réseau social (uniquement si pas de description)
 */
export const isSuspiciousBase = async (baseId: string): Promise<boolean> => {
  const base = await prismaClient.base.findUnique({
    where: { id: baseId },
    select: {
      created: true,
      description: true,
      website: true,
      facebook: true,
      twitter: true,
      linkedin: true,
    },
  })

  if (!base) {
    return false
  }

  // Vérifier si la base a été créée dans la dernière heure
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
  const isRecentlyCreated = base.created > oneHourAgo

  if (!isRecentlyCreated) {
    return false
  }

  // Vérifier si la description contient de l'anglais
  const hasEnglishInDescription = base.description
    ? isProbablyEnglish(base.description).isEnglish
    : false

  // Vérifier si la description contient simplement un lien
  const isDescriptionJustALink = base.description
    ? (() => {
        const desc = base.description.trim()
        // Cas 1: la description est strictement une URL http(s)
        const urlOnlyRegex = /^(https?:\/\/[^\s]+)$/i
        // Cas 2: la description contient une balise <a>
        const anchorHttpRegex = /<a\b[^>]*>/i
        return urlOnlyRegex.test(desc) || anchorHttpRegex.test(desc)
      })()
    : false

  // Vérifier si la base contient un site internet ou des réseaux sociaux
  // Uniquement suspect si pas de description
  const hasNoDescription = !base.description || base.description.trim() === ''
  const suspiciousWebsite =
    hasNoDescription && base.website !== null && base.website !== ''
  const suspiciousSocialMedia =
    hasNoDescription &&
    ((base.facebook !== null && base.facebook !== '') ||
      (base.twitter !== null && base.twitter !== '') ||
      (base.linkedin !== null && base.linkedin !== ''))

  // La base est suspecte si au moins un des critères est rempli
  return (
    hasEnglishInDescription ||
    isDescriptionJustALink ||
    suspiciousWebsite ||
    suspiciousSocialMedia
  )
}

/**
 * Supprime une base suspecte et le profil qui l'a créée, retourne true si la suppression a eu lieu
 */
export const deleteSuspiciousBase = async (
  baseId: string,
): Promise<boolean> => {
  const isSuspicious = await isSuspiciousBase(baseId)

  if (!isSuspicious) {
    return false
  }

  // Récupérer l'utilisateur qui a créé la base
  const base = await prismaClient.base.findUnique({
    where: { id: baseId },
    select: { createdById: true },
  })

  if (!base) {
    return false
  }

  // Supprimer d'abord la base (soft delete)
  const timestamp = new Date()
  await prismaClient.base.update({
    data: {
      deleted: timestamp,
      updated: timestamp,
    },
    where: { id: baseId },
  })

  // Puis supprimer le profil qui l'a créée
  await deleteProfile({
    id: base.createdById,
    reason: DeletedReason.SuspiciousAuto,
  })

  return true
}
