import Anthropic from '@anthropic-ai/sdk';
import type { SimulationConfig, AIAnalysis } from '../types';
import { CHARGE_RATES } from '../data/charges';
import { getTJM } from '../data/tjm';

export async function analyserStrategie(config: SimulationConfig): Promise<AIAnalysis> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  const chargeRate = CHARGE_RATES[config.typeContrat];
  const tjm = getTJM(config.domaine);
  const salaireCharge = config.salaireBrut * chargeRate;
  const coutManagerMensuel = config.heuresFormationSemaine * 4.33 * config.tauxHoraireManager;
  const coutInterneMensuel = salaireCharge + coutManagerMensuel;
  const coutAgenceMensuel = config.joursParMois * tjm;

  if (!apiKey) {
    return {
      resumeExecutif: `Pour le poste de ${config.titrePoste || config.domaine} en ${config.domaine} dans le secteur ${config.secteur}, l'analyse révèle que le recrutement interne à ${config.salaireBrut}€ brut/mois (coût chargé: ${salaireCharge.toLocaleString('fr-FR', { maximumFractionDigits: 0 })}€) implique des coûts cachés significatifs liés au management (${config.heuresFormationSemaine}h/sem à ${config.tauxHoraireManager}€/h) et au recrutement (${config.coutRecrutement.toLocaleString('fr-FR')}€). La délégation via Deluxe Conseil à ${config.joursParMois} jours/mois (TJM ${tjm}€) offre une expertise immédiate sans période de montée en compétence.`,
      risquesCaches: [
        `Turnover : un départ après 6 mois coûte en moyenne 1.5x le salaire annuel en coûts de remplacement.`,
        `Charge mentale managériale : ${config.heuresFormationSemaine}h/semaine de formation détournent votre manager de ses objectifs stratégiques.`,
        `Délai d'opérationnalité : un recrutement interne nécessite 3 à 6 mois avant d'atteindre 100% de productivité.`,
        `Risque juridique : les contrats ${config.typeContrat.toUpperCase()} comportent des obligations légales (période d'essai, indemnités) qui représentent un coût latent.`,
        `Coût d'opportunité : pendant la montée en compétence, les projets avancent plus lentement, impactant le CA potentiel.`,
      ],
      conclusion: `Pour ${config.nombrePostes} poste(s) en ${config.domaine}, la délégation à Deluxe Conseil permet un ROI immédiat grâce à l'expertise senior disponible dès J+1, sans les risques de turnover ni les coûts cachés de management. Cette approche est particulièrement pertinente dans le secteur ${config.secteur} où la vélocité d'exécution est un avantage concurrentiel déterminant.`,
    };
  }

  const client = new Anthropic({
    apiKey,
    dangerouslyAllowBrowser: true,
  });

  const prompt = `Tu es un consultant senior en stratégie RH chez Deluxe Conseil. Analyse cette situation et réponds UNIQUEMENT en JSON valide (pas de markdown, pas de code block).

Paramètres du client :
- Secteur : ${config.secteur}
- Domaine : ${config.domaine}
- Poste : ${config.titrePoste || 'Non précisé'}
- Séniorité : ${config.seniorite}
- Type de contrat envisagé : ${config.typeContrat.toUpperCase()}
- Nombre de postes : ${config.nombrePostes}
- Salaire brut : ${config.salaireBrut}€/mois
- Coût chargé : ${salaireCharge.toFixed(0)}€/mois (taux charges : ×${chargeRate})
- Coût recrutement : ${config.coutRecrutement}€
- Coût matériel : ${config.coutMateriel}€
- Heures formation/semaine : ${config.heuresFormationSemaine}h (coût manager: ${coutManagerMensuel.toFixed(0)}€/mois)
- Coût interne mensuel total : ${coutInterneMensuel.toFixed(0)}€
- Budget Deluxe mensuel : ${coutAgenceMensuel}€ (${config.joursParMois}j × ${tjm}€ TJM)

Axes d'analyse :
1. Comparaison financière directe (interne vs délégation)
2. Compétence et rapidité d'exécution
3. Flexibilité et agilité organisationnelle
4. Risques opérationnels, managériaux et stratégiques (turnover, charge mentale, coût d'opportunité)

Réponds avec ce JSON exact :
{
  "resumeExecutif": "string - synthèse tranchante en 3 phrases max, avec les chiffres clés",
  "risquesCaches": ["string - risque 1", "string - risque 2", "string - risque 3", "string - risque 4", "string - risque 5"],
  "conclusion": "string - recommandation stratégique en 2-3 phrases avec appel à l'action Deluxe Conseil"
}`;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  return JSON.parse(text) as AIAnalysis;
}
