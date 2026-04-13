import { Brain, AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import type { AIAnalysis as AIAnalysisType } from '../types';

interface Props {
  analysis: AIAnalysisType | null;
  loading: boolean;
}

export default function AIAnalysis({ analysis, loading }: Props) {
  if (loading) {
    return (
      <div className="glass rounded-2xl p-8 animate-fade-in">
        <div className="flex items-center gap-3.5 mb-5">
          <div className="p-2.5 rounded-xl bg-deluxe/20">
            <Brain size={22} className="text-deluxe animate-pulse" />
          </div>
          <h3 className="text-xl font-semibold text-white">Analyse IA en cours...</h3>
        </div>
        <div className="space-y-3.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-5 bg-dark-border/40 rounded-lg animate-pulse" style={{ width: `${90 - i * 15}%` }} />
          ))}
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="glass rounded-2xl p-8 animate-fade-in">
      <div className="flex items-center gap-3.5 mb-7">
        <div className="p-2.5 rounded-xl bg-deluxe/20 animate-pulse-glow">
          <Brain size={22} className="text-deluxe-light" />
        </div>
        <h3 className="text-xl font-semibold text-white">Analyse Stratégique IA</h3>
      </div>

      {/* Executive summary */}
      <div className="mb-7">
        <div className="flex items-center gap-2.5 mb-3">
          <FileText size={16} className="text-cyan" />
          <h4 className="text-[15px] font-semibold text-cyan">Résumé Exécutif</h4>
        </div>
        <p className="text-[15px] text-gray-300 leading-relaxed pl-6">{analysis.resumeExecutif}</p>
      </div>

      {/* Hidden risks */}
      <div className="mb-7">
        <div className="flex items-center gap-2.5 mb-4">
          <AlertTriangle size={16} className="text-warning" />
          <h4 className="text-[15px] font-semibold text-warning">Risques Cachés</h4>
        </div>
        <ul className="space-y-3 pl-6">
          {analysis.risquesCaches.map((risque, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[15px] text-gray-300">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-warning/60 flex-shrink-0" />
              {risque}
            </li>
          ))}
        </ul>
      </div>

      {/* Conclusion */}
      <div className="border-t border-dark-border/50 pt-6">
        <div className="flex items-center gap-2.5 mb-3">
          <CheckCircle size={16} className="text-deluxe-light" />
          <h4 className="text-[15px] font-semibold text-deluxe-light">Conclusion</h4>
        </div>
        <p className="text-[15px] text-gray-300 leading-relaxed pl-6">{analysis.conclusion}</p>
      </div>
    </div>
  );
}
