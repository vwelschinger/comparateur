/**
 * Taux de charges patronales par type de contrat.
 *
 * Sources :
 * - CDI : charges patronales moyennes ~42% du brut (URSSAF 2024-2025)
 * - CDD : idem CDI + indemnité de fin de contrat (10%) + congés payés proratisés → ~47%
 * - Alternance : exonération quasi-totale via OPCO + aide État (6 000€) → ~5%
 * - Contrat Pro : exonération partielle, charges réduites → ~10%
 * - Stage : gratification exonérée de charges jusqu'au seuil légal (4,35€/h) → 0%
 *
 * IMPORTANT : ces coefficients sont des moyennes simplifiées.
 * Le coût chargé = salaire brut × coefficient.
 *
 * Pour modifier : changez directement les valeurs ci-dessous.
 */

import type { ContractType } from '../types';

export const CHARGE_RATES: Record<ContractType, number> = {
  cdi: 1.42,        // Charges patronales ~42%
  cdd: 1.47,        // Charges ~42% + indemnité fin contrat ~5% (10% amorti sur durée)
  alternance: 1.05, // Quasi-exonéré (OPCO + aide État)
  pro: 1.10,        // Exonération partielle
  stage: 1.00,      // Gratification nette (pas de charges sous le seuil légal)
};

/** Labels lisibles pour l'UI */
export const CHARGE_LABELS: Record<ContractType, string> = {
  cdi: 'Charges patronales ~42%',
  cdd: 'Charges ~42% + ind. fin contrat',
  alternance: 'Quasi-exonéré (OPCO)',
  pro: 'Charges réduites (~10%)',
  stage: 'Gratification nette',
};

/**
 * Salaire minimum pour l'alternance selon l'âge et l'année de contrat.
 * Base : SMIC 2025 = 1 801,80€ brut/mois.
 *
 * Pour modifier : ajustez SMIC_BRUT_MENSUEL et les pourcentages.
 */
export const SMIC_BRUT_MENSUEL = 1802;

export const ALTERNANCE_GRILLE: Record<string, Record<string, number>> = {
  // Pourcentage du SMIC selon âge et année
  'moins_de_21': { annee_1: 0.43, annee_2: 0.51, annee_3: 0.67 },
  '21_a_25':     { annee_1: 0.53, annee_2: 0.61, annee_3: 0.78 },
  '26_et_plus':  { annee_1: 1.00, annee_2: 1.00, annee_3: 1.00 },
};

/** Gratification minimale de stage (2025) : 4,35€/h × 151,67h */
export const GRATIFICATION_STAGE_MENSUELLE = 660;
