
INSERT INTO target_to_beneficiary (target, beneficiary) VALUES
                                                            ('tous_publics', 'tous_publics'),
                                                            ('jeunes_enfants_6', 'enfants_mineurs'),
                                                            ('enfants_6_12', 'enfants_mineurs'),
                                                            ('adolescents_12_18', 'enfants_mineurs'),
                                                            ('jeunes_adultes_18_25', 'enfants_mineurs'),
                                                            ('adultes', 'adultes'),
                                                            ('seniors_personnes_agees', 'seniors_personnes_agees'),
                                                            ('parents', 'parents'),
                                                            ('personnes_tres_eloignees_numerique', 'personnes_tres_eloignees_numerique'),
                                                            ('personne_situation_handicap', 'personne_situation_handicap_ou_perte_autonomie'),
                                                            ('personnes_perte_autonomie', 'personne_situation_handicap_ou_perte_autonomie'),
                                                            ('personne_situation_illetrisme', 'personne_situation_illetrisme'),
                                                            ('personne_allophone', 'personne_allophone_ou_refugies_demandeurs_asile'),
                                                            ('refugies_demandeurs_asile', 'personne_allophone_ou_refugies_demandeurs_asile'),
                                                            ('personnes_insertion_professionnelle', 'personnes_en_insertion_sociale_ou_professionnelle'),
                                                            ('personnes_en_insertion_sociale', 'personnes_en_insertion_sociale_ou_professionnelle'),
                                                            ('particuliers', 'tous_publics');

INSERT INTO target_to_professional_sector (target, professional_sector) VALUES
                                                                            ('mediateurs_numeriques', 'aidants_et_mediateurs_numeriques'),
                                                                            ('aidants_numeriques', 'aidants_et_mediateurs_numeriques'),
                                                                            ('travailleurs_sociaux', 'aidants_et_mediateurs_numeriques'),
                                                                            ('associations_acteurs_ess', 'acteurs_prives_et_associatifs'),
                                                                            ('entreprises', 'acteurs_prives_et_associatifs'),
                                                                            ('collectivites_territoriales', 'acteurs_publics'),
                                                                            ('administrations_etablissements_publics', 'acteurs_publics'),
                                                                            ('elus', 'acteurs_publics'),
                                                                            ('enseignants_professionnels_formation', 'autres_professionnels'),
                                                                            ('autres_professionnels', 'autres_professionnels');
