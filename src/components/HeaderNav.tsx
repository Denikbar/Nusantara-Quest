import React, { useState } from 'react';
import { 
  Heart, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  Compass, 
  RotateCcw,
  Trophy
} from 'lucide-react';
import { EducationTier } from '../types';
import { sound } from '../services/sound';

interface HeaderNavProps {
  tier: EducationTier;
  onOpenTierModal: () => void;
  hearts: number;
  score: number;
  combo: number;
  restoredCount: number;
  totalArtifacts: number;
  onOpenMuseum: () => void;
  onOpenGuide: () => void;
  onOpenMap: () => void;
  onResetProgress: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  tier,
  onOpenTierModal,
  hearts,
  score,
  combo,
  restoredCount,
  totalArtifacts,
  onOpenMuseum,
  onOpenGuide,
  onOpenMap,
  onResetProgress
}) => {
  const [isMuted, setIsMuted] = useState(sound.isMuted);

  const toggleSound = () => {
    sound.playClick();
    const newMute = !isMuted;
    setIsMuted(newMute);
    sound.setMuted(newMute);
    if (!newMute) {
      sound.startBgm();
    }
  };

  const getTierBadge = () => {
    switch (tier) {
      case 'SD':
        return { label: 'SD • Penjelajah Muda', color: 'bg-emerald-600 text-emerald-100 border-emerald-400' };
      case 'SMP':
        return { label: 'SMP • Pejuang Sejarah', color: 'bg-amber-600 text-amber-100 border-amber-400' };
      case 'SMA':
        return { label: 'SMA/SMK • Ahli Historiografi', color: 'bg-purple-600 text-purple-100 border-purple-400' };
    }
  };

  const badge = getTierBadge();

  return (
    <header className="sticky top-0 z-40 bg-amber-950/90 backdrop-blur-md border-b-2 border-amber-700/60 px-3 sm:px-6 py-2.5 shadow-xl text-amber-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Logo & Game Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onOpenMap}>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-800 p-0.5 border-2 border-amber-300 shadow-md flex items-center justify-center text-xl font-bold font-pixel">
            NQ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-base sm:text-lg font-extrabold tracking-wide text-amber-200">
                NUSANTARA QUEST
              </span>
              <span className="hidden sm:inline-block text-xs uppercase tracking-widest px-2 py-0.5 rounded bg-amber-900/80 border border-amber-600 text-amber-300 font-pixel">
                Jejak Sejarah
              </span>
            </div>
            <p className="text-[11px] text-amber-300/80 hidden md:block">
              RPG-Trivia Penjaga Waktu Nusantara
            </p>
          </div>
        </div>

        {/* Center: Lives, Combo & Score */}
        <div className="flex items-center gap-3 sm:gap-6 bg-stone-900/80 px-3 py-1.5 rounded-xl border border-amber-800/60 shadow-inner">
          {/* Health Hearts */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-amber-300/70 mr-1 hidden sm:inline">Nyawa:</span>
            {[1, 2, 3].map((h) => (
              <Heart
                key={h}
                size={18}
                className={`transition-all duration-300 ${
                  h <= hearts 
                    ? 'fill-rose-500 text-rose-400 scale-100 animate-pulse' 
                    : 'fill-stone-800 text-stone-600 opacity-40 scale-90'
                }`}
              />
            ))}
          </div>

          <div className="h-4 w-px bg-amber-800/80" />

          {/* Combo Multiplier */}
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className={combo > 1 ? 'text-amber-400 animate-bounce' : 'text-stone-500'} />
            <span className="text-xs font-mono font-bold text-amber-300">
              {combo > 1 ? `x${combo.toFixed(1)} Combo!` : 'x1.0'}
            </span>
          </div>

          <div className="h-4 w-px bg-amber-800/80" />

          {/* Total Score */}
          <div className="flex items-center gap-1.5">
            <Trophy size={14} className="text-yellow-400" />
            <span className="font-mono text-sm sm:text-base font-black text-amber-200">
              {score.toLocaleString('id-ID')} <span className="text-[10px] text-amber-400 font-normal">pts</span>
            </span>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          {/* Tier Switcher Badge Button */}
          <button
            id="tier-badge-btn"
            onClick={onOpenTierModal}
            className={`text-xs px-2.5 py-1 rounded-lg border font-semibold tracking-wide transition-transform hover:scale-105 active:scale-95 shadow-sm flex items-center gap-1.5 ${badge.color}`}
            title="Ubah Jenjang Pendidikan (SD / SMP / SMA)"
          >
            <span>{badge.label}</span>
            <span className="text-[10px] bg-black/20 px-1 py-0.2 rounded font-mono">Ganti</span>
          </button>

          {/* Peta Wilayah Button */}
          <button
            id="open-map-btn"
            onClick={onOpenMap}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-amber-800/80 hover:bg-amber-700 text-amber-100 border border-amber-600 text-xs font-medium flex items-center gap-1 transition-all"
            title="Buka Peta 5 Wilayah"
          >
            <Compass size={15} />
            <span className="hidden md:inline">Peta Wilayah</span>
          </button>

          {/* Museum Button */}
          <button
            id="open-museum-btn"
            onClick={onOpenMuseum}
            className="relative p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-amber-900/80 hover:bg-amber-800 text-amber-200 border border-amber-700 text-xs font-medium flex items-center gap-1 transition-all"
            title="Museum Artefak Sejarah"
          >
            <BookOpen size={15} />
            <span className="hidden sm:inline">Museum</span>
            <span className="text-[10px] bg-amber-500 text-black px-1.5 py-0.2 rounded-full font-bold">
              {restoredCount}/{totalArtifacts}
            </span>
          </button>

          {/* Sound Mute/Unmute */}
          <button
            id="sound-toggle-btn"
            onClick={toggleSound}
            className={`p-1.5 rounded-lg border transition-colors ${
              isMuted
                ? 'bg-stone-800 border-stone-600 text-stone-400 hover:text-stone-200'
                : 'bg-amber-800/90 border-amber-600 text-amber-200 hover:bg-amber-700'
            }`}
            title={isMuted ? 'Nyalakan Musik & SFX' : 'Matikan Suara'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Guide Modal Trigger */}
          <button
            id="open-guide-btn"
            onClick={onOpenGuide}
            className="p-1.5 rounded-lg bg-stone-800/80 border border-amber-800 text-amber-300 hover:bg-stone-700 transition-colors"
            title="Panduan & Aturan Main"
          >
            <HelpCircle size={16} />
          </button>

          {/* Reset progress */}
          <button
            id="reset-progress-btn"
            onClick={onResetProgress}
            className="p-1.5 rounded-lg bg-stone-900/60 border border-stone-700 text-stone-400 hover:text-rose-400 hover:border-rose-800 transition-colors"
            title="Mulai Ulang Permainan"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
    </header>
  );
};
