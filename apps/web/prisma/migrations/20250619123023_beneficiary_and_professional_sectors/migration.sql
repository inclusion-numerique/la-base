-- temporary enums with all values
CREATE TYPE "beneficiary_tmp" AS ENUM (
  'tous_publics',
  'mediateurs_numeriques',
  'travailleurs_sociaux',
  'associations_acteurs_ess',
  'entreprises',
  'collectivites_territoriales',
  'administrations_etablissements_publics',
  'elus',
  'aidants_numeriques',
  'autres_professionnels',
  'enseignants_professionnels_formation',
  'jeunes_enfants_6',
  'enfants_6_12',
  'adolescents_12_18',
  'jeunes_adultes_18_25',
  'adultes',
  'parents',
  'seniors_personnes_agees',
  'personnes_tres_eloignees_numerique',
  'personnes_insertion_professionnelle',
  'personnes_en_insertion_sociale',
  'personnes_perte_autonomie',
  'refugies_demandeurs_asile',
  'personne_situation_illetrisme',
  'personne_allophone',
  'personne_situation_handicap',
  'enfants_mineurs',
  'personne_situation_handicap_ou_perte_autonomie',
  'personne_allophone_ou_refugies_demandeurs_asile',
  'personnes_en_insertion_sociale_ou_professionnelle',
  'particuliers'
);

CREATE TYPE "professional_sector_tmp" AS ENUM (
  'tous_publics',
  'mediateurs_numeriques',
  'travailleurs_sociaux',
  'associations_acteurs_ess',
  'entreprises',
  'collectivites_territoriales',
  'administrations_etablissements_publics',
  'elus',
  'aidants_numeriques',
  'autres_professionnels',
  'enseignants_professionnels_formation',
  'jeunes_enfants_6',
  'enfants_6_12',
  'adolescents_12_18',
  'jeunes_adultes_18_25',
  'adultes',
  'parents',
  'seniors_personnes_agees',
  'personnes_tres_eloignees_numerique',
  'personnes_insertion_professionnelle',
  'personnes_en_insertion_sociale',
  'personnes_perte_autonomie',
  'refugies_demandeurs_asile',
  'personne_situation_illetrisme',
  'personne_allophone',
  'personne_situation_handicap',
  'acteurs_publics',
  'acteurs_prives_et_associatifs',
  'aidants_et_mediateurs_numeriques'
);

-- final enums
CREATE TYPE "beneficiary" AS ENUM (
  'tous_publics',
  'enfants_mineurs',
  'adultes',
  'seniors_personnes_agees',
  'parents',
  'personnes_tres_eloignees_numerique',
  'personne_situation_handicap_ou_perte_autonomie',
  'personne_situation_illetrisme',
  'personne_allophone_ou_refugies_demandeurs_asile',
  'personnes_en_insertion_sociale_ou_professionnelle'
);

CREATE TYPE "professional_sector" AS ENUM (
  'acteurs_publics',
  'acteurs_prives_et_associatifs',
  'aidants_et_mediateurs_numeriques',
  'autres_professionnels'
);
