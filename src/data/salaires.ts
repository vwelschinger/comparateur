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
    {
      poste: 'Social Media Manager',
      junior:   { min: 30000, max: 38000 },
      confirme: { min: 38000, max: 48000 },
      senior:   { min: 48000, max: 58000 },
    },
    {
      poste: 'Traffic / Acquisition Manager',
      junior:   { min: 38000, max: 46000 },
      confirme: { min: 46000, max: 58000 },
      senior:   { min: 55000, max: 68000 },
    },
    {
      poste: 'CRM Manager',
      junior:   { min: 35000, max: 44000 },
      confirme: { min: 44000, max: 55000 },
      senior:   { min: 55000, max: 70000 },
    },
    {
      poste: 'Chef de projet digital',
      junior:   { min: 32000, max: 40000 },
      confirme: { min: 40000, max: 50000 },
      senior:   { min: 50000, max: 62000 },
    },
  ],

  // ======== COMMERCE (SALES) ========
  Commerce: [
    {
      poste: 'Business Developer',
      junior:   { min: 35000, max: 40000 },
      confirme: { min: 45000, max: 60000 },
      senior:   { min: 50000, max: 60000 },
    },
    {
      poste: 'Account Executive',
      junior:   { min: 35000, max: 40000 },
      confirme: { min: 45000, max: 60000 },
      senior:   { min: 50000, max: 60000 },
    },
    {
      poste: 'Account Manager',
      junior:   { min: 34000, max: 42000 },
      confirme: { min: 42000, max: 55000 },
      senior:   { min: 55000, max: 70000 },
    },
    {
      poste: 'Customer Success Manager',
      junior:   { min: 37000, max: 45000 },
      confirme: { min: 42000, max: 54000 },
      senior:   { min: 50000, max: 71000 },
    },
    {
      poste: 'SDR / Inside Sales',
      junior:   { min: 30000, max: 36000 },
      confirme: { min: 36000, max: 44000 },
      senior:   { min: 44000, max: 52000 },
    },
    {
      poste: 'Responsable commercial',
      junior:   { min: 38000, max: 48000 },
      confirme: { min: 48000, max: 62000 },
      senior:   { min: 62000, max: 85000 },
    },
    {
      poste: 'Directeur commercial / Head of Sales',
      junior:   { min: 50000, max: 65000 },
      confirme: { min: 65000, max: 85000 },
      senior:   { min: 85000, max: 120000 },
    },
  ],

  // ======== RH ========
  RH: [
    {
      poste: 'Talent Acquisition Manager',
      junior:   { min: 35000, max: 45000 },
      confirme: { min: 44000, max: 52000 },
      senior:   { min: 52000, max: 62000 },
    },
    {
      poste: 'Chargé de recrutement',
      junior:   { min: 28000, max: 35000 },
      confirme: { min: 35000, max: 42000 },
      senior:   { min: 42000, max: 50000 },
    },
    {
      poste: 'Responsable RH / RRH',
      junior:   { min: 38000, max: 48000 },
      confirme: { min: 48000, max: 60000 },
      senior:   { min: 60000, max: 80000 },
    },
    {
      poste: 'DRH / Head of People',
      junior:   { min: 50000, max: 65000 },
      confirme: { min: 65000, max: 85000 },
      senior:   { min: 85000, max: 110000 },
    },
    {
      poste: 'Chargé de formation',
      junior:   { min: 28000, max: 34000 },
      confirme: { min: 34000, max: 42000 },
      senior:   { min: 42000, max: 52000 },
    },
    {
      poste: 'Office Manager',
      junior:   { min: 28000, max: 34000 },
      confirme: { min: 34000, max: 40000 },
      senior:   { min: 40000, max: 48000 },
    },
  ],

  // ======== FINANCE ========
  Finance: [
    {
      poste: 'DAF / CFO',
      junior:   { min: 50000, max: 80000 },
      confirme: { min: 65000, max: 120000 },
      senior:   { min: 80000, max: 165000 },
    },
    {
      poste: 'Contrôleur de gestion',
      junior:   { min: 35000, max: 45000 },
      confirme: { min: 45000, max: 58000 },
      senior:   { min: 55000, max: 70000 },
    },
    {
      poste: 'Comptable / Responsable comptable',
      junior:   { min: 28000, max: 36000 },
      confirme: { min: 36000, max: 45000 },
      senior:   { min: 45000, max: 55000 },
    },
    {
      poste: 'Analyste financier',
      junior:   { min: 38000, max: 48000 },
      confirme: { min: 48000, max: 60000 },
      senior:   { min: 60000, max: 80000 },
    },
    {
      poste: 'Trésorier',
      junior:   { min: 35000, max: 45000 },
      confirme: { min: 45000, max: 58000 },
      senior:   { min: 58000, max: 72000 },
    },
  ],

  // ======== IT ========
  IT: [
    {
      poste: 'Développeur Full Stack',
      junior:   { min: 42000, max: 55000 },
      confirme: { min: 55000, max: 65000 },
      senior:   { min: 65000, max: 85000 },
    },
    {
      poste: 'Développeur Front-End',
      junior:   { min: 38000, max: 48000 },
      confirme: { min: 48000, max: 58000 },
      senior:   { min: 58000, max: 75000 },
    },
    {
      poste: 'Développeur Back-End',
      junior:   { min: 40000, max: 52000 },
      confirme: { min: 52000, max: 63000 },
      senior:   { min: 63000, max: 82000 },
    },
    {
      poste: 'Data Scientist / Data Engineer',
      junior:   { min: 45000, max: 55000 },
      confirme: { min: 55000, max: 70000 },
      senior:   { min: 65000, max: 90000 },
    },
    {
      poste: 'Product Manager / Product Owner',
      junior:   { min: 45000, max: 57000 },
      confirme: { min: 55000, max: 68000 },
      senior:   { min: 62000, max: 80000 },
    },
    {
      poste: 'DevOps / SRE',
      junior:   { min: 42000, max: 52000 },
      confirme: { min: 52000, max: 65000 },
      senior:   { min: 65000, max: 85000 },
    },
    {
      poste: 'CTO / Directeur technique',
      junior:   { min: 55000, max: 75000 },
      confirme: { min: 75000, max: 100000 },
      senior:   { min: 100000, max: 150000 },
    },
    {
      poste: 'Chef de projet IT / Scrum Master',
      junior:   { min: 38000, max: 48000 },
      confirme: { min: 48000, max: 60000 },
      senior:   { min: 60000, max: 78000 },
    },
  ],

  // ======== COMMUNICATION ========
  Communication: [
    {
      poste: 'Chargé de communication',
      junior:   { min: 30000, max: 38000 },
      confirme: { min: 38000, max: 48000 },
      senior:   { min: 48000, max: 58000 },
    },
    {
      poste: 'Directeur de communication',
      junior:   { min: 40000, max: 52000 },
      confirme: { min: 52000, max: 68000 },
      senior:   { min: 68000, max: 90000 },
    },
    {
      poste: 'Relations presse / PR Manager',
      junior:   { min: 32000, max: 40000 },
      confirme: { min: 40000, max: 52000 },
      senior:   { min: 52000, max: 65000 },
    },
    {
      poste: 'Community Manager',
      junior:   { min: 28000, max: 35000 },
      confirme: { min: 35000, max: 42000 },
      senior:   { min: 42000, max: 52000 },
    },
    {
      poste: 'Responsable événementiel',
      junior:   { min: 30000, max: 38000 },
      confirme: { min: 38000, max: 48000 },
      senior:   { min: 48000, max: 60000 },
    },
    {
      poste: 'Brand Manager',
      junior:   { min: 35000, max: 44000 },
      confirme: { min: 44000, max: 56000 },
      senior:   { min: 56000, max: 70000 },
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
  Marketing:      1100,
  Commerce:       1100,
  RH:             1050,
  Finance:        1200,
  IT:             1300,
  Communication:  1050,
};

/**
 * Gratification mensuelle moyenne pour un stagiaire, selon le domaine.
 * Base légale 2025 : 660€/mois. Beaucoup d'entreprises donnent plus.
 *
 * Pour modifier : ajustez directement les valeurs.
 */
export const SALAIRES_STAGE: Record<string, number> = {
  Marketing:      750,
  Commerce:       750,
  RH:             700,
  Finance:        850,
  IT:             1000,
  Communication:  700,
};
