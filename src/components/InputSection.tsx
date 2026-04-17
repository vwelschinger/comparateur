import { useMemo } from 'react';
import {
  Building2, Briefcase, DollarSign, Clock, RotateCcw, Monitor, Users, GraduationCap,
} from 'lucide-react';
import type { SimulationConfig, ContractType, Seniorite } from '../types';
import {
  SECTEURS, DOMAINES, CONTRACT_LABELS, SENIORITE_LABELS, CHARGE_RATES,
} from '../types';
import { getPostesParDomaine, getSalaireSuggere, getFourchette, getTJM } from '../data';

interface Props {
  config: SimulationConfig;
  onChange: (config: SimulationConfig) => void;
  onReset: () => void;
}

const inputClass =
  'w-full bg-dark-bg/70 border border-dark-border/70 rounded-xl px-3.5 py-2.5 text-[14px] text-gray-200 focus:outline-none focus:border-deluxe focus:ring-2 focus:ring-deluxe/20 transition-all appearance-none';

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-[12px] text-gray-500 mb-1.5 font-semibold uppercase tracking-wide">{children}</label>;
}

function ColTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-5 pb-3.5 border-b border-dark-border/40">
      <span className="p-1.5 rounded-lg bg-dark-bg/60">{icon}</span>
      <span className="text-[13px] font-semibold text-gray-300 uppercase tracking-wider">{title}</span>
    </div>
  );
}

function fmt(n: number): string {
  return n.toLocaleString('fr-FR');
}

export default function InputSection({ config, onChange, onReset }: Props) {
  const postes = useMemo(() => getPostesParDomaine(config.domaine), [config.domaine]);

  const fourchette = useMemo(
    () => getFourchette(config.domaine, config.titrePoste, config.seniorite),
    [config.domaine, config.titrePoste, config.seniorite],
  );

  const tjm = useMemo(() => getTJM(config.domaine), [config.domaine]);
  const salaireCharge = config.salaireBrut * CHARGE_RATES[config.typeContrat];
  const coutAgenceMois = config.joursParMois * tjm;

  function update<K extends keyof SimulationConfig>(key: K, value: SimulationConfig[K]) {
    const next = { ...config, [key]: value };
    if (key === 'domaine') {
      const newPostes = getPostesParDomaine(value as string);
      if (newPostes.length > 0 && !newPostes.includes(next.titrePoste)) {
        next.titrePoste = newPostes[0];
      }
    }
    if (key === 'domaine' || key === 'titrePoste' || key === 'seniorite' || key === 'typeContrat') {
      const suggestion = getSalaireSuggere(next.domaine, next.titrePoste, next.seniorite, next.typeContrat);
      if (suggestion !== null) next.salaireBrut = suggestion;
    }
    onChange(next);
  }

  return (
    <div className="space-y-6 w-full animate-fade-in">
      {/* Grille 3 colonnes : Profil / Coûts salariaux / Coûts opérationnels */}
      <div className="filter-panel rounded-2xl w-full">
        <div className="filters-grid">

          {/* ── Col 1 : Profil ── */}
          <div>
            <ColTitle icon={<Briefcase size={14} className="text-cyan" />} title="Profil du poste" />
            <div className="space-y-4">
              <div>
                <Label>Secteur d'activité</Label>
                <select value={config.secteur} onChange={(e) => update('secteur', e.target.value)} className={inputClass}>
                  {SECTEURS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <Label>Domaine</Label>
                <select value={config.domaine} onChange={(e) => update('domaine', e.target.value)} className={inputClass}>
                  {DOMAINES.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <Label>Poste</Label>
                <select value={config.titrePoste} onChange={(e) => update('titrePoste', e.target.value)} className={inputClass}>
                  {postes.length === 0 && <option value="">-- Sélectionnez un domaine --</option>}
                  {postes.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <Label>Séniorité</Label>
                <div className="grid grid-cols-3 gap-1.5 mt-1">
                  {(Object.entries(SENIORITE_LABELS) as [Seniorite, string][]).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => update('seniorite', key)}
                      className={`text-[12px] py-2.5 rounded-xl border transition-all font-semibold cursor-pointer ${
                        config.seniorite === key
                          ? 'bg-cyan/10 border-cyan/50 text-cyan shadow-[0_0_12px_rgba(20,184,207,0.15)]'
                          : 'border-dark-border/50 text-gray-500 hover:border-gray-500 hover:text-gray-300'
                      }`}
                    >
                      {label.split(' (')[0]}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Type de contrat</Label>
                <select
                  value={config.typeContrat}
                  onChange={(e) => update('typeContrat', e.target.value as ContractType)}
                  className={inputClass}
                >
                  {Object.entries(CONTRACT_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* ── Col 2 : Coûts salariaux ── */}
          <div>
            <ColTitle icon={<DollarSign size={14} className="text-warning" />} title="Coûts salariaux" />
            <div className="space-y-4">
              <div>
                <Label>Salaire brut mensuel</Label>
                <input
                  type="number" value={config.salaireBrut}
                  onChange={(e) => update('salaireBrut', +e.target.value)}
                  className={inputClass} step={100}
                />
                <div className="mt-2 space-y-1">
                  <p className="text-[12px] text-gray-500">
                    Chargé : <span className="text-warning font-semibold">{fmt(Math.round(salaireCharge))} €/mois</span>
                    <span className="text-gray-600"> ×{CHARGE_RATES[config.typeContrat]}</span>
                  </p>
                  {fourchette && (
                    <p className="text-[12px] text-cyan/70">
                      Marché : {fmt(Math.round(fourchette.min / 12))} – {fmt(Math.round(fourchette.max / 12))} €/mois
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label>Nombre de postes</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="range" min={1} max={10} value={config.nombrePostes}
                    onChange={(e) => update('nombrePostes', +e.target.value)}
                    className="flex-1"
                  />
                  <span className="text-deluxe font-bold text-[16px] w-6 text-right">{config.nombrePostes}</span>
                </div>
                <div className="flex justify-between text-[11px] text-gray-600 mt-1">
                  <span>1</span><span>5</span><span>10</span>
                </div>
              </div>
              <div>
                <Label>Coût de recrutement (one-shot)</Label>
                <input
                  type="number" value={config.coutRecrutement}
                  onChange={(e) => update('coutRecrutement', +e.target.value)}
                  className={inputClass} step={500}
                />
              </div>
            </div>
          </div>

          {/* ── Col 3 : Coûts opérationnels ── */}
          <div>
            <ColTitle icon={<Building2 size={14} className="text-deluxe" />} title="Coûts opérationnels" />
            <div className="space-y-4">
              <div>
                <Label>Coût matériel (one-shot)</Label>
                <div className="flex items-center gap-2.5 bg-dark-bg/70 border border-dark-border/70 rounded-xl px-3.5 py-2.5 focus-within:border-deluxe focus-within:ring-2 focus-within:ring-deluxe/20 transition-all">
                  <Monitor size={14} className="text-gray-500 flex-shrink-0" />
                  <input
                    type="number" value={config.coutMateriel}
                    onChange={(e) => update('coutMateriel', +e.target.value)}
                    className="bg-transparent text-[14px] text-gray-200 focus:outline-none w-full" step={500} placeholder="PC, licences..."
                  />
                </div>
              </div>
              <div>
                <Label>Taux horaire manager (€/h)</Label>
                <div className="flex items-center gap-2.5 bg-dark-bg/70 border border-dark-border/70 rounded-xl px-3.5 py-2.5 focus-within:border-deluxe focus-within:ring-2 focus-within:ring-deluxe/20 transition-all">
                  <Users size={14} className="text-gray-500 flex-shrink-0" />
                  <input
                    type="number" value={config.tauxHoraireManager}
                    onChange={(e) => update('tauxHoraireManager', +e.target.value)}
                    className="bg-transparent text-[14px] text-gray-200 focus:outline-none w-full" step={5}
                  />
                </div>
              </div>
              <div>
                <Label>
                  Formation/sem. :{' '}
                  <span className="text-cyan font-bold normal-case tracking-normal">{config.heuresFormationSemaine}h</span>
                </Label>
                <div className="flex items-center gap-3 mt-1">
                  <GraduationCap size={14} className="text-gray-500 flex-shrink-0" />
                  <input
                    type="range" min={0} max={20} value={config.heuresFormationSemaine}
                    onChange={(e) => update('heuresFormationSemaine', +e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Encart Budget Deluxe ── */}
      <div className="filter-panel rounded-2xl w-full" style={{ borderColor: 'rgba(20,184,207,0.2)', background: 'linear-gradient(135deg, rgba(20,184,207,0.06) 0%, rgba(32,39,51,0.98) 100%)' }}>
        <div className="flex items-center gap-2 mb-5 pb-3.5 border-b border-cyan/15">
          <span className="p-1.5 rounded-lg bg-dark-bg/60"><Clock size={14} className="text-cyan" /></span>
          <span className="text-[13px] font-semibold text-cyan uppercase tracking-wider">Budget Deluxe</span>
          <span className="ml-auto">
            <button
              onClick={onReset}
              className="btn-icon flex items-center gap-1.5 text-[12px]"
              title="Réinitialiser"
              style={{ padding: '0.35rem 0.75rem' }}
            >
              <RotateCcw size={12} />
              Réinitialiser
            </button>
          </span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-[1fr_auto]">
          {/* Slider jours */}
          <div className="space-y-3">
            <Label>
              Jours/mois par expert :{' '}
              <span className="text-cyan font-bold normal-case tracking-normal">{config.joursParMois}j</span>
            </Label>
            <input
              type="range" min={1} max={22} value={config.joursParMois}
              onChange={(e) => update('joursParMois', +e.target.value)}
              className="w-full"
            />
            <div className="flex justify-between text-[11px] text-gray-600">
              <span>1j</span><span>11j</span><span>22j</span>
            </div>
          </div>

          {/* Récapitulatif chiffré */}
          <div className="rounded-xl p-4 border border-cyan/15 min-w-[220px]" style={{ background: 'rgba(20,184,207,0.04)' }}>
            <div className="space-y-2.5">
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500">TJM {config.domaine}</span>
                <span className="text-cyan-light font-semibold">{fmt(tjm)} €</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500">Budget mensuel</span>
                <span className="text-cyan-light font-semibold">{fmt(coutAgenceMois)} €</span>
              </div>
              <div className="h-px bg-dark-border/30 my-1" />
              <div className="flex justify-between text-[13px]">
                <span className="text-gray-500">Budget annuel</span>
                <span className="text-cyan font-bold">{fmt(coutAgenceMois * 12)} €</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
