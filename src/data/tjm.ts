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
  Marketing: {
    base: 750,
    label: 'Expert Marketing Senior',
  },
  Commerce: {
    base: 800,
    label: 'Expert Commercial Senior',
  },
  RH: {
    base: 700,
    label: 'Expert RH Senior',
  },
  Finance: {
    base: 900,
    label: 'Expert Finance / DAF externalisé',
  },
  IT: {
    base: 850,
    label: 'Expert Tech / Dev Senior',
  },
  Communication: {
    base: 700,
    label: 'Expert Communication Senior',
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
