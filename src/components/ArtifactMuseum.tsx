import React, { useState } from 'react';
import { 
  X, 
  Award, 
  MapPin, 
  Calendar, 
  BookOpen, 
  Lock, 
  Sparkles, 
  ShieldCheck,
  Search
} from 'lucide-react';
import { Artifact } from '../types';
import { sound } from '../services/sound';

interface ArtifactMuseumProps {
  artifacts: Artifact[];
  onClose: () => void;
  onGoToEra: (eraId: string) => void;
}

export const ArtifactMuseum: React.FC<ArtifactMuseumProps> = ({
  artifacts,
  onClose,
  onGoToEra
}) => {
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact>(artifacts[0]);
  const [filter, setFilter] = useState<'all' | 'restored'>('all');

  const filteredArtifacts = filter === 'restored' 
    ? artifacts.filter((a) => a.restored) 
    : artifacts;

  const restoredCount = artifacts.filter((a) => a.restored).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-stone-900 border-2 border-amber-600 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-amber-50">
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-b-2 border-amber-700/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-xl shadow">
              🏛️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-cinzel text-lg sm:text-2xl font-black text-amber-100">
                  Museum Pusaka Waktu Nusantara
                </h2>
                <span className="text-[11px] font-mono bg-amber-950 px-2 py-0.5 rounded border border-amber-700 text-amber-300 font-bold">
                  {restoredCount}/{artifacts.length} Pulih
                </span>
              </div>
              <p className="text-xs text-stone-300 hidden sm:block">
                Koleksi artefak bersejarah yang berhasil diselamatkan dari manipulasi Penyihir Waktu.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Area: Left Grid List, Right Detail Card */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Artifact Thumbnails */}
          <div className="w-full md:w-5/12 border-b md:border-b-0 md:border-r border-stone-800 p-4 overflow-y-auto max-h-[40vh] md:max-h-full space-y-3">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs text-stone-400 font-mono">Daftar Artefak:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setFilter('all')}
                  className={`text-[11px] px-2.5 py-1 rounded font-semibold transition ${
                    filter === 'all'
                      ? 'bg-amber-600 text-stone-950'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  Semua ({artifacts.length})
                </button>
                <button
                  onClick={() => setFilter('restored')}
                  className={`text-[11px] px-2.5 py-1 rounded font-semibold transition ${
                    filter === 'restored'
                      ? 'bg-emerald-600 text-stone-950'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  Dipulihkan ({restoredCount})
                </button>
              </div>
            </div>

            {filteredArtifacts.map((art) => {
              const isSelected = selectedArtifact.id === art.id;
              return (
                <div
                  key={art.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedArtifact(art);
                  }}
                  className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-amber-950/80 border-amber-400 ring-2 ring-amber-500/30 shadow-md'
                      : art.restored
                      ? 'bg-stone-800/80 border-stone-700 hover:border-amber-500 hover:bg-stone-800'
                      : 'bg-stone-950/40 border-stone-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl p-2 rounded-lg bg-black/40 border border-stone-700">
                      {art.restored ? art.iconSymbol : '🔒'}
                    </div>
                    <div>
                      <div className="text-[10px] text-amber-400/80 font-mono">
                        {art.eraName}
                      </div>
                      <div className="font-cinzel text-xs sm:text-sm font-bold text-amber-100">
                        {art.name}
                      </div>
                    </div>
                  </div>

                  {art.restored ? (
                    <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
                  ) : (
                    <Lock size={15} className="text-stone-500 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Detailed Inspect View */}
          <div className="flex-1 p-5 sm:p-7 overflow-y-auto bg-stone-950/60">
            {selectedArtifact.restored ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-700 font-bold flex items-center gap-1">
                        <Sparkles size={12} /> Artefak Berhasil Dipulihkan
                      </span>
                      <span className="text-xs font-mono text-amber-400 bg-black/40 px-2 py-0.5 rounded border border-stone-700">
                        {selectedArtifact.eraName}
                      </span>
                    </div>
                    <h3 className="font-cinzel text-xl sm:text-2xl font-black text-amber-100">
                      {selectedArtifact.name}
                    </h3>
                  </div>

                  <div className="text-4xl p-3 rounded-2xl bg-amber-950/80 border-2 border-amber-500 shadow-xl shrink-0">
                    {selectedArtifact.iconSymbol}
                  </div>
                </div>

                {/* Metadata Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 flex items-center gap-2 text-stone-300">
                    <Calendar size={14} className="text-amber-400" />
                    <span>Perkiraan Masa: <strong>{selectedArtifact.yearEstimate}</strong></span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 flex items-center gap-2 text-stone-300">
                    <MapPin size={14} className="text-amber-400" />
                    <span>Asal Temuan: <strong>{selectedArtifact.originLocation}</strong></span>
                  </div>
                </div>

                {/* Physical Lore */}
                <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 text-xs text-stone-200 leading-relaxed">
                  <div className="font-bold text-amber-300 mb-1 flex items-center gap-1.5 font-cinzel">
                    <BookOpen size={14} />
                    <span>Deskripsi Fisik & Bentuk:</span>
                  </div>
                  <p>{selectedArtifact.description}</p>
                </div>

                {/* Historical Significance */}
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-700/60 text-xs text-amber-100/90 leading-relaxed">
                  <div className="font-bold text-amber-300 mb-1 flex items-center gap-1.5 font-cinzel">
                    <Award size={14} />
                    <span>Arti Penting bagi Sejarah Bangsa:</span>
                  </div>
                  <p>{selectedArtifact.historicalSignificance}</p>
                </div>
              </div>
            ) : (
              /* Locked Artifact Placeholder */
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-stone-900 border-2 border-stone-700 flex items-center justify-center text-stone-600 text-3xl">
                  🔒
                </div>
                <h3 className="font-cinzel text-lg font-bold text-stone-400">
                  {selectedArtifact.name} Masih Terdistorsi
                </h3>
                <p className="text-xs text-stone-400 max-w-sm">
                  Artefak ini belum dipulihkan. Selesaikan tantangan kuis di era <strong>{selectedArtifact.eraName}</strong> untuk mengembalikan pusaka ini ke museum.
                </p>
                <button
                  onClick={() => {
                    sound.playClick();
                    onGoToEra(selectedArtifact.eraId);
                    onClose();
                  }}
                  className="mt-2 py-2 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition"
                >
                  Pergi ke {selectedArtifact.eraName}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
