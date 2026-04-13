# Algorithme de Simulation Deluxe Conseil

Ce document décrit la logique utilisée pour comparer le recrutement interne vs la délégation Deluxe Conseil.

## 1. Simulation Quantitative (MetricsDashboard.tsx)

L'algorithme calcule les coûts cumulés et la productivité sur une période de 12 mois.

### A. Coûts Interne (Recrutement)
Le coût total interne est composé de :
1. **Coûts de démarrage (One-off) :**
   - `(Coût Recrutement + Coût Matériel) * Nombre de postes`
2. **Coûts Récurrents Mensuels :**
   - **Salaire Chargé :** `Salaire Apprenti/Employé * Nombre de postes`
   - **Coût Caché Management :** `(Heures Tuteur/semaine * 4.33 * Taux Horaire Manager) * Nombre de postes`
   - *Note : 4.33 est le nombre moyen de semaines par mois.*

### B. Coûts Deluxe Conseil (Délégation)
Le coût total Deluxe est calculé simplement :
- **Mensuel :** `Frais Mensuels Deluxe` (calculé en amont comme : `Jours/mois * Taux Journalier * Nombre de postes`)
- **Cumulé :** Somme des frais mensuels sur la période.

### C. Courbes de Productivité (Efficacité)
L'algorithme estime la montée en compétence (Onboarding) :

- **Deluxe Conseil :**
  - **100%** dès le mois 1 (Expert opérationnel immédiatement).

- **Interne (CDI / CDD) :**
  - Mois 1-2 : **50%** (Onboarding / Formation)
  - Mois 3-4 : **80%** (Montée en charge)
  - Mois 5+ : **100%** (Opérationnel)

- **Interne (Alternance / Stage) :**
  - Mois 1-3 : **30%** (Apprentissage fort)
  - Mois 4-6 : **50%** (Autonomie partielle)
  - Mois 7+ : **70%** (Plafonne souvent du fait du temps école/entreprise)

## 2. Analyse Qualitative (Gemini AI)

Une analyse sémantique est générée via l'API Google Gemini (`gemini-3-flash-preview`) pour contextualiser les chiffres.

### Prompt (Entrée)
Le système envoie à l'IA :
- Le secteur d'activité et le métier visé.
- Les données financières calculées (Salaire, Coût management, Budget Deluxe).
- La structure de comparaison : Compétence, Flexibilité, Risque.

### Réponse (Sortie)
L'IA génère un objet JSON contenant :
1. **Résumé Exécutif :** Une synthèse tranchante en 3 phrases.
2. **Risques Cachés :** Liste des risques opérationnels (métier), managériaux (temps perdu) et stratégiques (turnover).
3. **Conclusion :** Un appel à l'action pour valider le modèle Deluxe.
