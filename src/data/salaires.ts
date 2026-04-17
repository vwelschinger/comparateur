/**
 * Base de données des salaires du marché français.
 * Source : Ignition Program (grilles 2024-2025) + données marché.
 *
 * Structure : par domaine > poste > séniorité > fourchette (brut annuel).
 * Le simulateur convertit en mensuel (÷ 12) pour le préremplissage.
 *
 * Pour modifier ou ajouter des postes : éditez directement ce fichier.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Seniorite = 'junior' | 'confirme' | 'senior';

export interface FourchetteSalaire {
  /** Salaire brut annuel minimum (€) */
  min: number;
  /** Salaire brut annuel maximum (€) */
  max: number;
}

export interface PosteSalaire {
  /** Intitulé du poste */
  poste: string;
  /** Fourchettes par séniorité (brut annuel) */
  junior: FourchetteSalaire;
  confirme: FourchetteSalaire;
  senior: FourchetteSalaire;
}

// ---------------------------------------------------------------------------
// Base de données
// ---------------------------------------------------------------------------

export const SALAIRES_DATABASE: Record<string, PosteSalaire[]> = {

  // ======== COMMERCE (SALES) ========
  Commerce: [
    {
      poste: 'Responsable commercial',
      junior:   { min: 38000, max: 48000 },
      confirme: { min: 48000, max: 62000 },
      senior:   { min: 62000, max: 85000 },
    },
    {
      poste: 'Business Developer',
      junior:   { min: 35000, max: 40000 },
      confirme: { min: 45000, max: 60000 },
      senior:   { min: 50000, max: 60000 },
    },
    {
      poste: 'SDR / Inside Sales',
      junior:   { min: 30000, max: 36000 },
      confirme: { min: 36000, max: 44000 },
      senior:   { min: 44000, max: 52000 },
    },
  ],

  // ======== MARKETING ========
  Marketing: [
    {
      poste: 'Marketing Manager',
      junior:   { min: 33000, max: 46000 },
      confirme: { min: 41000, max: 56000 },
      senior:   { min: 55000, max: 78000 },
    },
    {
      poste: 'Content Manager',
      junior:   { min: 35000, max: 42000 },
      confirme: { min: 43000, max: 57000 },
      senior:   { min: 53000, max: 62000 },
    },
    {
      poste: 'Growth Hacker / Growth Manager',
      junior:   { min: 42000, max: 50000 },
      confirme: { min: 48000, max: 60000 },
      senior:   { min: 58000, max: 70000 },
    },
  ],

  // ======== GESTION DE PROJETS ========
  'Gestion de Projets': [
    {
      poste: 'Chef de projet',
      junior:   { min: 35000, max: 44000 },
      confirme: { min: 44000, max: 55000 },
      senior:   { min: 55000, max: 70000 },
    },
    {
      poste: 'Product Manager / Product Owner',
      junior:   { min: 45000, max: 57000 },
      confirme: { min: 55000, max: 68000 },
      senior:   { min: 62000, max: 80000 },
    },
    {
      poste: 'Scrum Master',
      junior:   { min: 40000, max: 50000 },
      confirme: { min: 50000, max: 62000 },
      senior:   { min: 62000, max: 78000 },
    },
  ],
};

// ---------------------------------------------------------------------------
// Postes pour alternance / stage (salaires spécifiques)
// ---------------------------------------------------------------------------

/**
 * Salaire mensuel moyen pour un alternant, selon le domaine.
 * Basé sur une moyenne pondérée des grilles légales (21-25 ans, 2e année).
 *
 * Pour modifier : ajustez directement les valeurs.
 */
export const SALAIRES_ALTERNANCE: Record<string, number> = {
  Commerce:              1100,
  Marketing:             1100,
  'Gestion de Projets':  1200,
};

/**
 * Gratification mensuelle moyenne pour un stagiaire, selon le domaine.
 * Base légale 2025 : 660€/mois. Beaucoup d'entreprises donnent plus.
 *
 * Pour modifier : ajustez directement les valeurs.
 */
export const SALAIRES_STAGE: Record<string, number> = {
  Commerce:              750,
  Marketing:             750,
  'Gestion de Projets':  850,
};
