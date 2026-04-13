export type ContractType = 'alternance' | 'pro' | 'stage' | 'cdd' | 'cdi';
export type Seniorite = 'junior' | 'confirme' | 'senior';

export interface SimulationConfig {
  secteur: string;
  nombrePostes: number;
  domaine: string;
  titrePoste: string;
  seniorite: Seniorite;
  typeContrat: ContractType;
  salaireBrut: number;
  coutRecrutement: number;
  coutMateriel: number;
  tauxHoraireManager: number;
  heuresFormationSemaine: number;
  joursParMois: number;
}

export interface CoutBreakdown {
  salaireCharge: number;
  coutManagerMensuel: number;
  coutStartup: number;
  coutAgenceMensuel: number;
  tjmUtilise: number;
}

export interface SimulationResults {
  coutInterne: number;
  coutAgence: number;
  delta: number;
  isEconomie: boolean;
  coutsMensuelsInterne: number[];
  coutsMensuelsAgence: number[];
  efficaciteInterne: number[];
  efficaciteAgence: number[];
  breakdown: CoutBreakdown;
}

export interface AIAnalysis {
  resumeExecutif: string;
  risquesCaches: string[];
  conclusion: string;
}

export interface ContactForm {
  nom: string;
  email: string;
  telephone: string;
  disponibilite: string;
}

export const SECTEURS = [
  'IT, Telecom & Digital',
  'Énergie & Bornes de recharge',
  'Bâtiment intelligent & Smart Building',
  'Territoires connectés & Smart City',
  'Édition logicielle & SaaS',
  'Cybersécurité & Cloud',
  'IoT & Objets connectés',
  'Intégration & Services numériques',
];

export const DOMAINES = ['Marketing', 'Commerce', 'RH', 'Finance', 'IT', 'Communication'];

export const CONTRACT_LABELS: Record<ContractType, string> = {
  alternance: 'Alternance',
  pro: 'Contrat Pro',
  stage: 'Stage',
  cdd: 'CDD',
  cdi: 'CDI',
};

// Réexport depuis la data layer (source unique de vérité)
export { CHARGE_RATES } from './data/charges';
export { TJM_DEFAULT as TJM_AGENCE, getTJM } from './data/tjm';

export const SENIORITE_LABELS: Record<Seniorite, string> = {
  junior: 'Junior (0-2 ans)',
  confirme: 'Confirmé (3-5 ans)',
  senior: 'Senior (6+ ans)',
};
