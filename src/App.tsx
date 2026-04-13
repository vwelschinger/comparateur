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
      <nav className="glass-strong sticky top-0 z-40 nav-padding flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo className="h-9 w-auto sm:h-11" />
          <div className="hidden sm:block h-7 w-px bg-dark-border" />
          <span className="hidden sm:block text-[15px] text-gray-400 font-medium">
            Arbitrage RH
          </span>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="btn-secondary text-[13px] sm:text-[15px]"
          style={{ padding: '0.5rem 0.875rem' }}
        >
          <CalendarCheck size={16} />
          <span className="hidden sm:inline">Réserver un Audit</span>
          <span className="sm:hidden">Audit</span>
        </button>
      </nav>

      {/* Main content */}
      <main className="main-padding flex flex-col gap-5 w-full box-border">
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
