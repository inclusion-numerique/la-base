import { TargetAudience } from '@prisma/client'

export const legacyResourcesTargetAudienceMapping: {
  [legacyId: number]: TargetAudience
} = {
  // 75,Vieillesse / retraite
  75: TargetAudience.SeniorsPersonnesAgees,
  // 146,Médiateurs numériques
  146: TargetAudience.MediateursNumeriques,
  // 58,"Professionnels de l'accompagnement (social, numérique…)"
  58: TargetAudience.TravailleursSociaux,
  // 518,Associations
  518: TargetAudience.AssociationsActeursEss,
  // 519,Entreprises
  519: TargetAudience.Entreprises,
  // 145,Agents d'administrations ou d'établissements publics
  145: TargetAudience.AdministrationsEtablissementsPublics,
  // 134,Agents de l'ANCT
  134: TargetAudience.AdministrationsEtablissementsPublics,
  // 144,Agents de collectivités
  144: TargetAudience.CollectivitesTerritoriales,
  // 137,Elus
  137: TargetAudience.Elus,
  // 51,Aidants familiaux
  51: TargetAudience.AidantsNumeriques,
  // 59,"Autres professionnels (santé, services aux personnes…)"
  59: TargetAudience.AutresProfessionnels,
  // 57,Professionnels de l’accueil
  57: TargetAudience.AidantsNumeriques,
  // 649,Enseignants / ingénieurs pédagogiques
  649: TargetAudience.EnseignantsProfessionnelsFormation,
  // 49,Adultes
  49: TargetAudience.Adultes,
  // 12,Adolescents (12-18 ans)
  12: TargetAudience.Adolescents12_18,
  // 48,Jeunes adultes (18-25 ans)
  48: TargetAudience.JeunesAdultes18_25,
  // 52,Parents
  52: TargetAudience.Parents,
  // 11,Enfants (6-12 ans)
  11: TargetAudience.Enfants6_12,
  // 53,Personnes très éloignées du numérique
  53: TargetAudience.PersonnesTresEloigneesNumerique,
  // 55,Personnes en insertion professionnelle
  55: TargetAudience.PersonnesInsertionProfessionnelle,
  // 50,Personnes âgées
  50: TargetAudience.SeniorsPersonnesAgees,
  // 151,Retraités
  151: TargetAudience.SeniorsPersonnesAgees,
  // 56,Personnes en insertion sociale
  56: TargetAudience.PersonnesEnInsertionSociale,
  // 152,Personnes en perte d'autonomie
  152: TargetAudience.PersonnesPerteAutonomie,
  // 10,Jeunes enfants (<6 ans)
  10: TargetAudience.JeunesEnfants6,
  // 54,Réfugiés / demandeurs d'asile
  54: TargetAudience.RefugiesDemandeursAsile,
  // 629,Illettrisme
  629: TargetAudience.PersonneSituationIlletrisme,
}

export const getTargetAudienceFromLegacyTags = (
  resourceTags: { tag_id: bigint }[],
): TargetAudience[] => {
  // Use a set to have unique themes only
  const targetAudiences = new Set<TargetAudience>()
  for (const tag of resourceTags) {
    const targetAudience =
      legacyResourcesTargetAudienceMapping[Number(tag.tag_id)]
    if (targetAudience) {
      targetAudiences.add(targetAudience)
    }
  }
  return [...targetAudiences]
}
