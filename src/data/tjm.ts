/**
 * Taux Journalier Moyen (TJM) Deluxe Conseil par domaine.
 *
 * Chaque domaine a un TJM de base (expert confirmé).
 * Le TJM effectif peut varier selon la séniorité de l'expert délégué.
 *
 * Pour modifier : changez directement les valeurs ci-dessous.
 */

export interface TJMConfig {
  /** TJM de base en euros (expert confirmé) */
  base: number;
  /** Description pour l'UI */
  label: string;
}

/**
 * TJM par domaine.
 * Clés = valeurs du tableau DOMAINES dans types.ts.
 */
export const TJM_PAR_DOMAINE: Record<string, TJMConfig> = {
  Commerce: {
    base: 800,
    label: 'Expert Commercial Senior',
  },
  Marketing: {
    base: 750,
    label: 'Expert Marketing Senior',
  },
  'Gestion de Projets': {
    base: 800,
    label: 'Expert Gestion de Projets Senior',
  },
};

/** TJM par défaut si le domaine n'est pas trouvé */
export const TJM_DEFAULT = 800;

/**
 * Retourne le TJM pour un domaine donné.
 * Fallback sur TJM_DEFAULT si le domaine n'existe pas.
 */
export function getTJM(domaine: string): number {
  return TJM_PAR_DOMAINE[domaine]?.base ?? TJM_DEFAULT;
}
