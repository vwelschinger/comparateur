import { useState, useMemo, useCallback } from 'react';
import { CalendarCheck } from 'lucide-react';
import Logo from './components/Logo';
import InputSection from './components/InputSection';
import MetricsDashboard from './components/MetricsDashboard';
import ContactModal from './components/ContactModal';
import { computeResults } from './services/calculateur';
import { getPostesParDomaine, getSalaireSuggere } from './data';
import type { SimulationConfig } from './types';

const defaultDomaine = 'Commerce';
const defaultPoste = getPostesParDomaine(defaultDomaine)[0] ?? '';
const defaultSalaire =
  getSalaireSuggere(defaultDomaine, defaultPoste, 'senior', 'cdi') ?? 6100;

const DEFAULT_CONFIG: SimulationConfig = {
  secteur: 'IT, Telecom & Digital',
  nombrePostes: 1,
  domaine: defaultDomaine,
  titrePoste: defaultPoste,
  seniorite: 'senior',
  typeContrat: 'cdi',
  salaireBrut: defaultSalaire,
  coutRecrutement: 8000,
  coutMateriel: 2000,
  tauxHoraireManager: 75,
  heuresFormationSemaine: 6,
  joursParMois: 8,
};

export default function App() {
  const [config, setConfig] = useState<SimulationConfig>(DEFAULT_CONFIG);
  const [modalOpen, setModalOpen] = useState(false);

  const results = useMemo(() => computeResults(config), [config]);

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg overflow-x-hidden">
      {/* Navbar */}
      <nav className="glass-strong sticky top-0 z-40 nav-padding flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo className="h-9 w-auto sm:h-11" />
          <div className="hidden sm:block h-7 w-px bg-dark-border" />
          <span className="hidden sm:block text-[19px] text-gray-200 font-bold uppercase tracking-widest">
            Dois-je externaliser ?
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
      <main className="main-padding flex flex-col gap-16 w-full box-border">
        <InputSection
          config={config}
          onChange={setConfig}
          onReset={handleReset}
        />

        <MetricsDashboard results={results} />
      </main>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
