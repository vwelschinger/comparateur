/**
 * Agent Back-Office — Moteur de calcul du simulateur.
 *
 * Implémente la logique définie dans README.txt.txt :
 * - Coûts internes (recrutement) vs Coûts Deluxe (délégation)
 * - Courbes de productivité différenciées par type de contrat
 */

import type { SimulationConfig, SimulationResults } from '../types';
import { CHARGE_RATES } from '../data/charges';
import { getTJM } from '../data/tjm';

function resolveTJM(config: SimulationConfig): number {
  return config.tjm > 0 ? config.tjm : getTJM(config.domaine);
}

// ---------------------------------------------------------------------------
// Courbes de productivité (% d'efficacité par mois)
// ---------------------------------------------------------------------------

/**
 * Productivité interne CDI / CDD / Contrat Pro :
 * - Mois 1-2 : 50% (Onboarding / Formation)
 * - Mois 3-4 : 80% (Montée en charge)
 * - Mois 5+  : 100% (Opérationnel)
 */
function getEfficaciteCDI(mois: number): number {
  if (mois <= 2) return 50;
  if (mois <= 4) return 80;
  return 100;
}

/**
 * Productivité interne Alternance / Stage :
 * - Mois 1-3 : 30% (Apprentissage fort)
 * - Mois 4-6 : 50% (Autonomie partielle)
 * - Mois 7+  : 70% (Plafonne — temps école/entreprise)
 */
function getEfficaciteAlternance(mois: number): number {
  if (mois <= 3) return 30;
  if (mois <= 6) return 50;
  return 70;
}

/**
 * Retourne le % d'efficacité interne pour un mois donné,
 * selon le type de contrat.
 */
function getEfficaciteInterne(mois: number, typeContrat: string): number {
  if (typeContrat === 'alternance' || typeContrat === 'stage') {
    return getEfficaciteAlternance(mois);
  }
  return getEfficaciteCDI(mois);
}

// ---------------------------------------------------------------------------
// Calcul principal
// ---------------------------------------------------------------------------

export function computeResults(config: SimulationConfig): SimulationResults {
  const chargeRate = CHARGE_RATES[config.typeContrat];
  const tjm = resolveTJM(config);

  // Coûts unitaires mensuels
  const salaireCharge = config.salaireBrut * chargeRate;
  const coutManagerMensuel =
    config.heuresFormationSemaine * 4.33 * config.tauxHoraireManager;
  const coutInterneMensuel = salaireCharge + coutManagerMensuel;
  const coutAgenceMensuel = config.joursParMois * tjm;

  // Coûts de démarrage (one-off) : (Recrutement + Matériel) × Postes
  const coutStartup =
    (config.coutRecrutement + config.coutMateriel) * config.nombrePostes;

  // Simulation sur 12 mois
  const coutsMensuelsInterne: number[] = [];
  const coutsMensuelsAgence: number[] = [];
  const efficaciteInterne: number[] = [];
  const efficaciteAgence: number[] = [];

  let cumInterne = coutStartup;
  let cumAgence = 0;

  for (let m = 1; m <= 12; m++) {
    cumInterne += coutInterneMensuel * config.nombrePostes;
    cumAgence += coutAgenceMensuel * config.nombrePostes;

    coutsMensuelsInterne.push(Math.round(cumInterne));
    coutsMensuelsAgence.push(Math.round(cumAgence));

    // Productivité
    efficaciteAgence.push(100); // Deluxe : 100% dès J+1
    efficaciteInterne.push(getEfficaciteInterne(m, config.typeContrat));
  }

  const coutInterne = coutsMensuelsInterne[11];
  const coutAgence = coutsMensuelsAgence[11];
  const delta = coutAgence - coutInterne;

  return {
    coutInterne,
    coutAgence,
    delta,
    isEconomie: delta <= 0,
    coutsMensuelsInterne,
    coutsMensuelsAgence,
    efficaciteInterne,
    efficaciteAgence,
    breakdown: {
      salaireCharge: Math.round(salaireCharge),
      coutManagerMensuel: Math.round(coutManagerMensuel),
      coutStartup,
      coutAgenceMensuel: Math.round(coutAgenceMensuel),
      tjmUtilise: tjm,
    },
  };
}
