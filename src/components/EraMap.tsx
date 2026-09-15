import React from 'react';
import { 
  Lock, 
  Star, 
  Play, 
  Sparkles, 
  MapPin, 
  Scroll, 
  ShieldCheck, 
  Skull,
  Award
} from 'lucide-react';
import { EraId, EraInfo, Artifact } from '../types';
import { ERAS_DATA } from '../data/erasData';
import { sound } from '../services/sound';

interface EraMapProps {
  unlockedEras: EraId[];
  starsPerEra: Record<EraId, number>;
  scoresPerEra: Record<EraId, number>;
  artifacts: Artifact[];
  currentEra: EraId;
  onSelectEra: (eraId: EraId) => void;
  onStartBattle: (eraId: EraId) => void;
  onStartSideScroller: (eraId: EraId) => void;
  onClose?: () => void;
}

export const EraMap: React.FC<EraMapProps> = ({
  unlockedEras,
  starsPerEra,
  scoresPerEra,
  artifacts,
  currentEra,
  onSelectEra,
  onStartSideScroller
}) => {
  const isUnlocked = (eraId: EraId) => unlockedEras.includes(eraId);

  const handleEraClick = (era: EraInfo) => {
    sound.playClick();
    if (isUnlocked(era.id)) {
      onSelectEra(era.id);
    }
  };

  const getArtifactForEra = (eraId: EraId) => {
    return artifacts.find((a) => a.eraId === eraId);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-6 text-amber-50">
      {/* Map Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-2 border-amber-700/80 p-5 sm:p-7 shadow-2xl mb-8">
        <div className="absolute -right-10 -bottom-10 opacity-10 text-amber-300 font-pixel text-9xl pointer-events-none select-none">
          NUSANTARA
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-600/30 text-amber-300 text-xs px-2.5 py-0.5 rounded-full border border-amber-500 font-pixel uppercase tracking-wider">
                Garis Waktu Peradaban Indonesia
              </span>
              <span className="text-xs text-amber-300/80 font-mono">
                {unlockedEras.length} dari 5 Wilayah Terbuka
              </span>
            </div>
            <h1 className="font-cinzel text-2xl sm:text-4xl font-black text-amber-100 drop-shadow">
              Peta Penjelajahan Waktu Nusantara
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mt-1 leading-relaxed">
              Jelajahi setiap babak sejarah, kalahkan <strong className="text-rose-400">Bayangan Penyihir Waktu</strong> di setiap era, kumpulkan kembali artefak pusaka, dan raih minimal <strong className="text-yellow-400">1 Bintang</strong> untuk membuka gerbang wilayah berikutnya!
            </p>
          </div>

          <div className="flex items-center gap-3 bg-stone-900/90 border border-amber-600/60 p-3 rounded-xl shadow-lg shrink-0">
            <div className="text-center px-2">
              <div className="text-xs text-amber-300/80">Total Bintang</div>
              <div className="font-mono text-xl font-black text-yellow-400 flex items-center justify-center gap-1">
                <Star size={18} className="fill-yellow-400" />
                {(Object.values(starsPerEra) as number[]).reduce((a: number, b: number) => a + b, 0)}/15
              </div>
            </div>
            <div className="h-8 w-px bg-stone-700" />
            <div className="text-center px-2">
              <div className="text-xs text-amber-300/80">Artefak Pulih</div>
              <div className="font-mono text-xl font-black text-emerald-400 flex items-center justify-center gap-1">
                <Award size={18} />
                {artifacts.filter(a => a.restored).length}/5
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Eras Timeline Pathway Grid */}
      <div className="space-y-4 sm:space-y-6">
        {ERAS_DATA.map((era, index) => {
          const unlocked = isUnlocked(era.id);
          const stars = starsPerEra[era.id] || 0;
          const highscore = scoresPerEra[era.id] || 0;
          const isCurrent = currentEra === era.id;
          const artifact = getArtifactForEra(era.id);

          return (
            <div
              key={era.id}
              onClick={() => handleEraClick(era)}
              className={`relative rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                unlocked 
                  ? isCurrent 
                    ? 'border-amber-400 bg-stone-900/95 ring-4 ring-amber-500/30 shadow-2xl scale-[1.01]'
                    : 'border-amber-700/60 bg-stone-900/80 hover:border-amber-500 hover:bg-stone-900 cursor-pointer shadow-lg'
                  : 'border-stone-800 bg-stone-950/60 opacity-60 cursor-not-allowed'
              }`}
            >
              {/* Colored era top accent stripe */}
              <div className={`h-2 w-full bg-gradient-to-r ${era.themeColor}`} />

              <div className="p-4 sm:p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
                {/* Left: Era Number, Title, Overview */}
                <div className="flex items-start gap-4">
                  {/* Big Era Number Badge */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center font-pixel text-2xl sm:text-3xl font-bold shrink-0 border-2 shadow-inner ${
                    unlocked
                      ? 'bg-amber-600 text-stone-950 border-amber-300'
                      : 'bg-stone-800 text-stone-600 border-stone-700'
                  }`}>
                    {unlocked ? `0${index + 1}` : <Lock size={20} />}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/40 text-amber-300 border border-stone-700">
                        {era.timePeriod}
                      </span>
                      {stars === 3 && (
                        <span className="text-[11px] bg-yellow-500/20 text-yellow-300 border border-yellow-500/60 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                          <Sparkles size={11} /> Sempurna (Mastery)
                        </span>
                      )}
                      {artifact?.restored && (
                        <span className="text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                          <ShieldCheck size={11} /> Artefak Dipulihkan
                        </span>
                      )}
                    </div>

                    <h2 className="font-cinzel text-lg sm:text-xl font-bold text-amber-100 flex items-center gap-2">
                      {era.title}
                      <span className="text-xs font-sans font-normal text-amber-400/80 hidden sm:inline">
                        — {era.subtitle}
                      </span>
                    </h2>

                    <p className="text-xs text-stone-300 mt-1 max-w-2xl line-clamp-2">
                      {era.overview}
                    </p>

                    {/* NPC and Boss Indicators */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 text-xs text-stone-400">
                      <div className="flex items-center gap-1 text-amber-300">
                        <Scroll size={13} />
                        <span>Tokoh: <strong>{era.npcName}</strong></span>
                      </div>
                      <div className="flex items-center gap-1 text-rose-400">
                        <Skull size={13} />
                        <span>Penjaga Distorsi: <strong>{era.bossName}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Stars, High Score & Action Button */}
                <div className="w-full lg:w-auto flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-stone-800">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-xl border border-stone-800">
                    {[1, 2, 3].map((starIdx) => (
                      <Star
                        key={starIdx}
                        size={18}
                        className={
                          starIdx <= stars
                            ? 'fill-yellow-400 text-yellow-400 drop-shadow'
                            : 'text-stone-700'
                        }
                      />
                    ))}
                    <span className="text-xs text-stone-400 font-mono ml-1">
                      {stars}/3
                    </span>
                  </div>

                  {/* High score info */}
                  {highscore > 0 && (
                    <div className="text-xs font-mono text-amber-400/90 hidden sm:block">
                      Skor Terbaik: <strong>{highscore.toLocaleString('id-ID')}</strong>
                    </div>
                  )}

                  {/* Play / Enter Era Button */}
                  {unlocked ? (
                    <button
                      id={`play-era-${era.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playClick();
                        onStartSideScroller(era.id);
                      }}
                      className="py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95"
                    >
                      <Play size={16} fill="currentColor" />
                      <span>Jelajahi Era</span>
                    </button>
                  ) : (
                    <div className="text-xs text-stone-500 flex items-center gap-1 font-mono">
                      <Lock size={13} />
                      <span>Terkunci (Raih 1★ di Era Sebelumnya)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
