/**
 * Agent Conformité — Point d'entrée de la couche données.
 *
 * Exporte les bases de données et les fonctions de lookup
 * utilisées par le simulateur pour le préremplissage automatique.
 */

export { CHARGE_RATES, CHARGE_LABELS, SMIC_BRUT_MENSUEL, ALTERNANCE_GRILLE, GRATIFICATION_STAGE_MENSUELLE } from './charges';
export { TJM_PAR_DOMAINE, TJM_DEFAULT, getTJM } from './tjm';
export { SALAIRES_DATABASE, SALAIRES_ALTERNANCE, SALAIRES_STAGE } from './salaires';
export type { Seniorite, FourchetteSalaire, PosteSalaire } from './salaires';
export type { TJMConfig } from './tjm';

import { SALAIRES_DATABASE, SALAIRES_ALTERNANCE, SALAIRES_STAGE } from './salaires';
import type { Seniorite } from './salaires';
import type { ContractType } from '../types';

// ---------------------------------------------------------------------------
// Fonctions de lookup
// ---------------------------------------------------------------------------

/**
 * Retourne la liste des postes disponibles pour un domaine donné.
 */
export function getPostesParDomaine(domaine: string): string[] {
  const postes = SALAIRES_DATABASE[domaine];
  if (!postes) return [];
  return postes.map((p) => p.poste);
}

/**
 * Retourne le salaire brut mensuel suggéré pour un profil donné.
 *
 * Logique :
 * - Alternance / Stage : salaire fixe par domaine (grilles légales).
 * - CDI / CDD / Pro : médiane de la fourchette Ignition pour le poste et la séniorité.
 * - Si le poste n'est pas trouvé : retourne null (l'utilisateur saisit manuellement).
 *
 * @returns Salaire brut mensuel en euros, ou null si non trouvé.
 */
export function getSalaireSuggere(
  domaine: string,
  poste: string,
  seniorite: Seniorite,
  typeContrat: ContractType,
): number | null {
  // Alternance : salaire spécifique par domaine
  if (typeContrat === 'alternance') {
    return SALAIRES_ALTERNANCE[domaine] ?? 1100;
  }

  // Stage : gratification par domaine
  if (typeContrat === 'stage') {
    return SALAIRES_STAGE[domaine] ?? 700;
  }

  // CDI / CDD / Pro : lookup dans la base Ignition
  const postesData = SALAIRES_DATABASE[domaine];
  if (!postesData) return null;

  const entry = postesData.find((p) => p.poste === poste);
  if (!entry) return null;

  const fourchette = entry[seniorite];
  if (!fourchette) return null;

  // Médiane de la fourchette, converti en mensuel
  const annuelMedian = Math.round((fourchette.min + fourchette.max) / 2);
  return Math.round(annuelMedian / 12);
}

/**
 * Retourne la fourchette brute annuelle pour un poste/séniorité.
 * Utile pour afficher "Fourchette marché : XX k€ — XX k€" dans l'UI.
 *
 * @returns { min, max } en brut annuel, ou null si non trouvé.
 */
export function getFourchette(
  domaine: string,
  poste: string,
  seniorite: Seniorite,
): { min: number; max: number } | null {
  const postesData = SALAIRES_DATABASE[domaine];
  if (!postesData) return null;

  const entry = postesData.find((p) => p.poste === poste);
  if (!entry) return null;

  return entry[seniorite] ?? null;
}
