import { prismaClient } from '@app/web/prismaClient'
import { deleteProfile } from '@app/web/server/rpc/profile/deleteProfile'
import { DeletedReason } from '@prisma/client'

// Détection simple d'anglais par score heuristique
// - Vérifie la proportion de mots fréquents anglais
// - Vérifie la proportion de lettres ASCII et l'absence d'accents fréquents

const COMMON_EN_WORDS = new Set([
  'the',
  'be',
  'to',
  'of',
  'and',
  'a',
  'in',
  'that',
  'have',
  'i',
  'it',
  'for',
  'not',
  'on',
  'with',
  'he',
  'as',
  'you',
  'do',
  'at',
  'this',
  'but',
  'his',
  'by',
  'from',
  'they',
  'we',
  'say',
  'her',
  'she',
  'or',
  'an',
  'will',
  'my',
  'one',
  'all',
  'would',
  'there',
  'their',
  'hello',
  'world',
  'is',
  'are',
  'was',
  'were',
  'am',
  'been',
  'being',
  'has',
  'had',
  'having',
  'can',
  'could',
  'should',
  'would',
  'may',
  'might',
  'must',
  'shall',
  'will',
  'go',
  'goes',
  'went',
  'gone',
  'going',
  'come',
  'comes',
  'came',
  'come',
  'coming',
  'get',
  'gets',
  'got',
  'gotten',
  'getting',
  'make',
  'makes',
  'made',
  'making',
  'take',
  'takes',
  'took',
  'taken',
  'taking',
  'see',
  'sees',
  'saw',
  'seen',
  'seeing',
  'know',
  'knows',
  'knew',
  'known',
  'knowing',
  'think',
  'thinks',
  'thought',
  'thinking',
  'look',
  'looks',
  'looked',
  'looking',
  'use',
  'uses',
  'used',
  'using',
  'find',
  'finds',
  'found',
  'finding',
  'give',
  'gives',
  'gave',
  'given',
  'giving',
  'tell',
  'tells',
  'told',
  'telling',
  'work',
  'works',
  'worked',
  'working',
  'call',
  'calls',
  'called',
  'calling',
  'try',
  'tries',
  'tried',
  'trying',
  'ask',
  'asks',
  'asked',
  'asking',
  'need',
  'needs',
  'needed',
  'needing',
  'feel',
  'feels',
  'felt',
  'feeling',
  'become',
  'becomes',
  'became',
  'becoming',
  'leave',
  'leaves',
  'left',
  'leaving',
  'put',
  'puts',
  'putting',
  'mean',
  'means',
  'meant',
  'meaning',
  'keep',
  'keeps',
  'kept',
  'keeping',
  'let',
  'lets',
  'letting',
  'begin',
  'begins',
  'began',
  'begun',
  'beginning',
  'seem',
  'seems',
  'seemed',
  'seeming',
  'help',
  'helps',
  'helped',
  'helping',
  'talk',
  'talks',
  'talked',
  'talking',
  'turn',
  'turns',
  'turned',
  'turning',
  'start',
  'starts',
  'started',
  'starting',
  'show',
  'shows',
  'showed',
  'shown',
  'showing',
  'hear',
  'hears',
  'heard',
  'hearing',
  'play',
  'plays',
  'played',
  'playing',
  'run',
  'runs',
  'ran',
  'run',
  'running',
  'move',
  'moves',
  'moved',
  'moving',
  'live',
  'lives',
  'lived',
  'living',
  'believe',
  'believes',
  'believed',
  'believing',
  'bring',
  'brings',
  'brought',
  'bringing',
  'happen',
  'happens',
  'happened',
  'happening',
  'write',
  'writes',
  'wrote',
  'written',
  'writing',
  'provide',
  'provides',
  'provided',
  'providing',
  'sit',
  'sits',
  'sat',
  'sitting',
  'stand',
  'stands',
  'stood',
  'standing',
  'lose',
  'loses',
  'lost',
  'losing',
  'pay',
  'pays',
  'paid',
  'paying',
  'meet',
  'meets',
  'met',
  'meeting',
  'include',
  'includes',
  'included',
  'including',
  'continue',
  'continues',
  'continued',
  'continuing',
  'set',
  'sets',
  'setting',
  'learn',
  'learns',
  'learned',
  'learning',
  'change',
  'changes',
  'changed',
  'changing',
  'lead',
  'leads',
  'led',
  'leading',
  'understand',
  'understands',
  'understood',
  'understanding',
  'watch',
  'watches',
  'watched',
  'watching',
  'follow',
  'follows',
  'followed',
  'following',
  'stop',
  'stops',
  'stopped',
  'stopping',
  'create',
  'creates',
  'created',
  'creating',
  'speak',
  'speaks',
  'spoke',
  'spoken',
  'speaking',
  'read',
  'reads',
  'reading',
  'allow',
  'allows',
  'allowed',
  'allowing',
  'add',
  'adds',
  'added',
  'adding',
  'spend',
  'spends',
  'spent',
  'spending',
  'grow',
  'grows',
  'grew',
  'grown',
  'growing',
  'open',
  'opens',
  'opened',
  'opening',
  'walk',
  'walks',
  'walked',
  'walking',
  'win',
  'wins',
  'won',
  'winning',
  'offer',
  'offers',
  'offered',
  'offering',
  'remember',
  'remembers',
  'remembered',
  'remembering',
  'love',
  'loves',
  'loved',
  'loving',
  'consider',
  'considers',
  'considered',
  'considering',
  'appear',
  'appears',
  'appeared',
  'appearing',
  'buy',
  'buys',
  'bought',
  'buying',
  'wait',
  'waits',
  'waited',
  'waiting',
  'serve',
  'serves',
  'served',
  'serving',
  'die',
  'dies',
  'died',
  'dying',
  'send',
  'sends',
  'sent',
  'sending',
  'expect',
  'expects',
  'expected',
  'expecting',
  'build',
  'builds',
  'built',
  'building',
  'stay',
  'stays',
  'stayed',
  'staying',
  'fall',
  'falls',
  'fell',
  'fallen',
  'falling',
  'cut',
  'cuts',
  'cutting',
  'reach',
  'reaches',
  'reached',
  'reaching',
  'kill',
  'kills',
  'killed',
  'killing',
  'remain',
  'remains',
  'remained',
  'remaining',
  'suggest',
  'suggests',
  'suggested',
  'suggesting',
  'raise',
  'raises',
  'raised',
  'raising',
  'pass',
  'passes',
  'passed',
  'passing',
  'sell',
  'sells',
  'sold',
  'selling',
  'require',
  'requires',
  'required',
  'requiring',
  'report',
  'reports',
  'reported',
  'reporting',
  'decide',
  'decides',
  'decided',
  'deciding',
  'pull',
  'pulls',
  'pulled',
  'pulling',
])

// Lettres accentuées communes en français/espagnol (souvent non anglais)
const NON_EN_ACCENTS_REGEX = /[àâäáãåçéèêëíìîïñóòôöõúùûüÿœæ]/i

export type LangGuess = {
  isEnglish: boolean
  score: number // 0..1 (plus c'est proche de 1, plus c'est probablement de l'anglais)
  reasons: string[]
}

export function isProbablyEnglish(text: string): LangGuess {
  const reasons: string[] = []
  const clean = text.trim()
  if (clean.length === 0) {
    return { isEnglish: false, score: 0, reasons: ['Texte vide'] }
  }

  // Normalisation basique
  const lower = clean.toLowerCase()

  // 1) Heuristique caractères: proportion ASCII lettres/espaces/punctuations courantes
  const asciiLike = lower.replace(/[a-z0-9\s.,;:'"!?()\-\n]/g, '')
  const asciiPenalty = Math.min(1, asciiLike.length / Math.max(1, lower.length))
  if (asciiPenalty === 0) reasons.push('Caractères majoritairement ASCII')

  // Pénalité spécifique aux accents non-anglais
  const hasAccents = NON_EN_ACCENTS_REGEX.test(lower)
  if (hasAccents) reasons.push("Présence d'accents non-anglais")

  // 2) Heuristique mots fréquents anglais
  // Tokenisation simple
  const words = lower.match(/[a-z]+/g) ?? []
  const uniqueWords = new Set(words)
  let commonCount = 0
  for (const w of uniqueWords) {
    if (COMMON_EN_WORDS.has(w)) commonCount++
  }
  const vocabScore =
    uniqueWords.size > 0 ? commonCount / Math.min(20, uniqueWords.size) : 0

  if (vocabScore > 0.15) reasons.push('Présence de mots fréquents anglais')

  // 3) Motifs typiques (articles 'the', 'and', 'of', pronoms 'you', 'we', etc.)
  const patternHits = [
    /\bthe\b/,
    /\band\b/,
    /\bof\b/,
    /\byou\b/,
    /\bfor\b/,
    /\bwith\b/,
    /\bthis\b/,
    /\bthat\b/,
  ].reduce((acc, rx) => acc + (rx.test(lower) ? 1 : 0), 0)
  const patternScore = patternHits / 8

  // Combinaison des scores (pondérations simples)
  // - Plus il y a d'accents/pas ASCII, plus on pénalise
  // - On bonifie vocabScore et patternScore
  const rawScore =
    0.55 * vocabScore + 0.35 * patternScore + 0.1 * (1 - asciiPenalty)

  const penalty = hasAccents ? 0.15 : 0
  const score = Math.max(0, Math.min(1, rawScore - penalty))

  const isEnglish = score >= 0.15 // Seuil empirique optimisé pour détecter l'anglais
  if (isEnglish && reasons.length === 0)
    reasons.push('Heuristiques concordantes')
  if (!isEnglish && reasons.length === 0)
    reasons.push('Heuristiques non concluantes')

  return { isEnglish, score, reasons }
}

// containsEnglishText supprimé au profit de isProbablyEnglish

/**
 * Détecte si un profil est suspect selon les critères définis :
 * - Compte créé dans les 60 dernières minutes
 * - Description contient de l'anglais
 * - Description contient simplement un lien
 * - Profil contient un site internet ou un réseau social (uniquement si pas de description)
 */
export const isSuspiciousProfile = async (userId: string): Promise<boolean> => {
  const user = await prismaClient.user.findUnique({
    where: { id: userId },
    select: {
      created: true,
      signedUpAt: true,
      description: true,
      website: true,
      facebook: true,
      twitter: true,
      linkedin: true,
    },
  })

  if (!user) {
    return false
  }

  // Vérifier si le compte a été créé dans la dernière heure
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
  const isRecentlyCreated =
    (user.created && user.created > oneHourAgo) ||
    (user.signedUpAt && user.signedUpAt > oneHourAgo)

  if (!isRecentlyCreated) {
    return false
  }

  // Vérifier si la description contient de l'anglais
  const hasEnglishInDescription = user.description
    ? isProbablyEnglish(user.description).isEnglish
    : false

  // Vérifier si la description contient simplement un lien
  const isDescriptionJustALink = user.description
    ? (() => {
        const desc = user.description.trim()
        // Cas 1: la description est strictement une URL http(s)
        const urlOnlyRegex = /^(https?:\/\/[^\s]+)$/i
        // Cas 2: la description contient une balise <a>
        const anchorHttpRegex = /<a\b[^>]*>/i
        return urlOnlyRegex.test(desc) || anchorHttpRegex.test(desc)
      })()
    : false

  // Vérifier si le profil contient un site internet ou des réseaux sociaux (uniquement si pas de description)
  const hasNoDescription = !user.description || user.description.trim() === ''
  const suspiciousWebsite =
    hasNoDescription && user.website !== null && user.website !== ''
  const suspiciousSocialMedia =
    hasNoDescription &&
    ((user.facebook !== null && user.facebook !== '') ||
      (user.twitter !== null && user.twitter !== '') ||
      (user.linkedin !== null && user.linkedin !== ''))

  // Le profil est suspect si au moins un des critères est rempli
  return (
    hasEnglishInDescription ||
    isDescriptionJustALink ||
    suspiciousWebsite ||
    suspiciousSocialMedia
  )
}

/**
 * Supprime un profil suspect et retourne true si la suppression a eu lieu
 */
export const deleteSuspiciousProfile = async (
  userId: string,
): Promise<boolean> => {
  const isSuspicious = await isSuspiciousProfile(userId)

  if (!isSuspicious) {
    return false
  }

  // Conserver la raison de suppression (enum mappé côté Prisma -> string DB)
  await deleteProfile({ id: userId, reason: DeletedReason.SuspiciousAuto })

  return true
}
