import { useState, useMemo, useCallback } from 'react';
import { CalendarCheck } from 'lucide-react';
import Logo from './components/Logo';
import InputSection from './components/InputSection';
import MetricsDashboard from './components/MetricsDashboard';
import AIAnalysisCard from './components/AIAnalysis';
import ContactModal from './components/ContactModal';
import { analyserStrategie } from './services/aiService';
import { computeResults } from './services/calculateur';
import { getPostesParDomaine, getSalaireSuggere } from './data';
import type { SimulationConfig, AIAnalysis } from './types';

const defaultPoste = getPostesParDomaine('Marketing')[0] ?? '';
const defaultSalaire = getSalaireSuggere('Marketing', defaultPoste, 'confirme', 'cdi') ?? 2800;

const DEFAULT_CONFIG: SimulationConfig = {
  secteur: 'IT, Telecom & Digital',
  nombrePostes: 1,
  domaine: 'Marketing',
  titrePoste: defaultPoste,
  seniorite: 'confirme',
  typeContrat: 'cdi',
  salaireBrut: defaultSalaire,
  coutRecrutement: 5000,
  coutMateriel: 1500,
  tauxHoraireManager: 60,
  heuresFormationSemaine: 4,
  joursParMois: 10,
};

export default function App() {
  const [config, setConfig] = useState<SimulationConfig>(DEFAULT_CONFIG);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const results = useMemo(() => computeResults(config), [config]);

  const handleAnalyse = useCallback(async () => {
    setAiLoading(true);
    try {
      const result = await analyserStrategie(config);
      setAnalysis(result);
    } catch (err) {
      console.error('AI Analysis error:', err);
    } finally {
      setAiLoading(false);
    }
  }, [config]);

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    setAnalysis(null);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg overflow-x-hidden">
      {/* Navbar */}
      <nav className="glass-strong sticky top-0 z-40 flex items-center justify-between" style={{ padding: '1rem 2rem' }}>
        <div className="flex items-center gap-5">
          <Logo className="h-11 w-auto" />
          <div className="hidden sm:block h-7 w-px bg-dark-border" />
          <span className="hidden sm:block text-[15px] text-gray-400 font-medium">
            Arbitrage RH
          </span>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="btn-secondary text-[15px] px-5 py-2.5"
        >
          <CalendarCheck size={18} />
          Réserver un Audit
        </button>
      </nav>

      {/* Main content */}
      <main className="flex flex-col gap-6 w-full box-border" style={{ padding: '2rem 3rem 3rem' }}>
        <InputSection
          config={config}
          onChange={setConfig}
          onAnalyse={handleAnalyse}
          onReset={handleReset}
          loading={aiLoading}
        />

        <MetricsDashboard results={results} />

        <AIAnalysisCard analysis={analysis} loading={aiLoading} />

        {analysis && !aiLoading && (
          <div className="flex justify-center animate-fade-in pb-4">
            <button
              onClick={() => setModalOpen(true)}
              className="btn-cta text-[16px] px-8 py-4 rounded-2xl"
            >
              <CalendarCheck size={20} />
              Réserver un Audit Personnalisé
            </button>
          </div>
        )}
      </main>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
