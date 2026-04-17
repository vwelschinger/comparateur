import {
  LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, Building2, Handshake, ArrowLeftRight, Receipt } from 'lucide-react';
import type { SimulationResults } from '../types';

interface Props {
  results: SimulationResults;
}

function KPICard({
  label, value, icon, color, accentColor, subtitle,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  accentColor: string;
  subtitle?: string;
}) {
  return (
    <div className="glass rounded-2xl animate-fade-in relative overflow-hidden" style={{ padding: '2rem' }}>
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top right, ${accentColor} 0%, transparent 70%)` }}
      />
      <div className="flex items-start justify-between mb-5">
        <span className="text-[11px] text-gray-500 uppercase tracking-widest font-semibold">{label}</span>
        <span className={`p-2.5 rounded-xl ${color}`}>{icon}</span>
      </div>
      <p className="text-[34px] font-bold text-white leading-none tracking-tight">{value}</p>
      {subtitle && <p className="text-[12px] text-gray-500 mt-3 leading-relaxed">{subtitle}</p>}
    </div>
  );
}

function fmt(n: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

const MOIS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

export default function MetricsDashboard({ results }: Props) {
  const { breakdown } = results;

  const costData = MOIS.map((mois, i) => ({
    mois,
    Interne: results.coutsMensuelsInterne[i],
    Deluxe: results.coutsMensuelsAgence[i],
  }));

  const effData = MOIS.map((mois, i) => ({
    mois,
    'Deluxe (%)': results.efficaciteAgence[i],
    'Interne (%)': results.efficaciteInterne[i],
  }));

  return (
    <div className="space-y-16 animate-fade-in">
      {/* KPIs */}
      <div className="kpi-grid">
        <KPICard
          label="Coût Total Interne (1 an)"
          value={fmt(results.coutInterne)}
          icon={<Building2 size={20} />}
          color="bg-warning/20 text-warning"
          accentColor="#f59e0b"
          subtitle={`Chargé ${fmt(breakdown.salaireCharge)}/mois + Manager ${fmt(breakdown.coutManagerMensuel)}/mois + Démarrage ${fmt(breakdown.coutStartup)}`}
        />
        <KPICard
          label="Budget Deluxe (1 an)"
          value={fmt(results.coutAgence)}
          icon={<Handshake size={20} />}
          color="bg-cyan/20 text-cyan"
          accentColor="#14b8cf"
          subtitle={`TJM ${fmt(breakdown.tjmUtilise)} × Jours × Postes × 12 mois`}
        />
        <KPICard
          label="Bilan Financier"
          value={fmt(Math.abs(results.delta))}
          icon={results.isEconomie ? <TrendingDown size={20} /> : <TrendingUp size={20} />}
          color={results.isEconomie ? 'bg-deluxe/20 text-deluxe-light' : 'bg-danger/20 text-danger'}
          accentColor={results.isEconomie ? '#559a71' : '#ef4444'}
          subtitle={results.isEconomie ? 'Économie avec Deluxe' : 'Surcoût avec Deluxe'}
        />
      </div>

      {/* Décomposition */}
      <div className="glass rounded-2xl animate-fade-in" style={{ padding: '2rem' }}>
        <h3 className="flex items-center gap-3 text-[15px] font-semibold text-gray-300 mb-5">
          <Receipt size={18} className="text-deluxe" />
          Décomposition mensuelle
        </h3>
        <div className="breakdown-grid text-[13px]">
          <div className="flex justify-between text-gray-400 min-w-0">
            <span className="truncate mr-2">Salaire chargé</span>
            <span className="text-warning font-semibold whitespace-nowrap">{fmt(breakdown.salaireCharge)}</span>
          </div>
          <div className="flex justify-between text-gray-400 min-w-0">
            <span className="truncate mr-2">Budget Deluxe / mois</span>
            <span className="text-cyan font-semibold whitespace-nowrap">{fmt(breakdown.coutAgenceMensuel)}</span>
          </div>
          <div className="flex justify-between text-gray-400 min-w-0">
            <span className="truncate mr-2">Coût manager / mois</span>
            <span className="text-warning font-semibold whitespace-nowrap">{fmt(breakdown.coutManagerMensuel)}</span>
          </div>
          <div className="flex justify-between text-gray-400 min-w-0">
            <span className="truncate mr-2">TJM appliqué</span>
            <span className="text-cyan font-semibold whitespace-nowrap">{fmt(breakdown.tjmUtilise)}</span>
          </div>
          <div className="flex justify-between text-gray-400 min-w-0 border-t border-dark-border/30 pt-2 mt-1">
            <span className="truncate mr-2">Coûts démarrage (one-shot)</span>
            <span className="text-warning font-semibold whitespace-nowrap">{fmt(breakdown.coutStartup)}</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        {/* Cost comparison */}
        <div className="glass rounded-2xl" style={{ padding: '2rem' }}>
          <h3 className="flex items-center gap-3 text-[15px] font-semibold text-gray-300 mb-6">
            <ArrowLeftRight size={18} className="text-deluxe" />
            Coûts cumulés sur 12 mois
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="mois" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(42,50,65,0.95)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#e5e7eb',
                  fontSize: 13,
                  padding: '10px 14px',
                }}
                formatter={(value) => fmt(Number(value))}
              />
              <Legend wrapperStyle={{ fontSize: 13, color: '#9ca3af', paddingTop: 8 }} />
              <Line type="monotone" dataKey="Interne" stroke="#f59e0b" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="Deluxe" stroke="#14b8cf" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Efficiency */}
        <div className="glass rounded-2xl" style={{ padding: '2rem' }}>
          <h3 className="flex items-center gap-3 text-[15px] font-semibold text-gray-300 mb-6">
            <TrendingUp size={18} className="text-cyan" />
            Efficacité opérationnelle
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={effData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="mois" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                domain={[0, 110]}
                tickFormatter={(v: number) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(42,50,65,0.95)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#e5e7eb',
                  fontSize: 13,
                  padding: '10px 14px',
                }}
                formatter={(value) => `${Number(value)}%`}
              />
              <Legend wrapperStyle={{ fontSize: 13, color: '#9ca3af', paddingTop: 8 }} />
              <defs>
                <linearGradient id="gradCyan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8cf" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#14b8cf" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#559a71" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#559a71" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="Deluxe (%)" stroke="#14b8cf" fill="url(#gradCyan)" strokeWidth={2.5} />
              <Area type="monotone" dataKey="Interne (%)" stroke="#559a71" fill="url(#gradGreen)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
