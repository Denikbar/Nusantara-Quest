import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUp, 
  Sparkles, 
  MessageSquare, 
  Sword, 
  Puzzle, 
  Compass,
  Zap,
  Info
} from 'lucide-react';
import { EraId, EraInfo } from '../types';
import { ERAS_DATA } from '../data/erasData';
import { sound } from '../services/sound';

interface SideScrollerWorldProps {
  eraId: EraId;
  onBackToMap: () => void;
  onOpenTrivia: () => void;
  onOpenChronology: () => void;
  onOpenMatching: () => void;
  starsEarned: number;
}

export const SideScrollerWorld: React.FC<SideScrollerWorldProps> = ({
  eraId,
  onBackToMap,
  onOpenTrivia,
  onOpenChronology,
  onOpenMatching,
  starsEarned
}) => {
  const era: EraInfo = ERAS_DATA.find((e) => e.id === eraId) || ERAS_DATA[0];

  // Player position along the track (0 to 1000 px)
  const [playerX, setPlayerX] = useState<number>(120);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [activeCheckpoint, setActiveCheckpoint] = useState<string | null>(null);

  // Time anomaly orbs collected in this session
  const [collectedOrbs, setCollectedOrbs] = useState<number[]>([]);
  const [bonusScore, setBonusScore] = useState<number>(0);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setDirection('right');
        setIsMoving(true);
        setPlayerX((prev) => Math.min(prev + 18, 920));
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setDirection('left');
        setIsMoving(true);
        setPlayerX((prev) => Math.max(prev - 18, 40));
      } else if ((e.key === 'ArrowUp' || e.key === ' ' || e.key === 'w' || e.key === 'W') && !isJumping) {
        setIsJumping(true);
        sound.playClick();
        setTimeout(() => setIsJumping(false), 450);
      } else if (e.key === 'e' || e.key === 'E' || e.key === 'Enter') {
        triggerActiveAction();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowRight', 'd', 'D', 'ArrowLeft', 'a', 'A'].includes(e.key)) {
        setIsMoving(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isJumping, activeCheckpoint]);

  // Check nearby checkpoints & collect orbs
  useEffect(() => {
    // Checkpoints locations:
    // 1. NPC Station: 240
    // 2. Minigame Station: 520
    // 3. Boss Altar Station: 800
    if (Math.abs(playerX - 240) < 55) {
      setActiveCheckpoint('npc');
    } else if (Math.abs(playerX - 520) < 55) {
      setActiveCheckpoint('minigame');
    } else if (Math.abs(playerX - 800) < 55) {
      setActiveCheckpoint('boss');
    } else {
      setActiveCheckpoint(null);
    }

    // Floating orbs at 180, 380, 660
    const orbs = [180, 380, 660];
    orbs.forEach((orbX, idx) => {
      if (!collectedOrbs.includes(idx) && Math.abs(playerX - orbX) < 30) {
        setCollectedOrbs((prev) => [...prev, idx]);
        setBonusScore((prev) => prev + 50);
        sound.playPowerUp();
      }
    });
  }, [playerX, collectedOrbs]);

  const triggerActiveAction = () => {
    if (activeCheckpoint === 'npc') {
      sound.playClick();
      onOpenTrivia();
    } else if (activeCheckpoint === 'minigame') {
      sound.playClick();
      onOpenChronology();
    } else if (activeCheckpoint === 'boss') {
      sound.playClick();
      onOpenTrivia();
    }
  };

  // Scenery visual styling based on era
  const getEraThemeDetails = () => {
    switch (eraId) {
      case 'hindu-buddha':
        return {
          sky: 'from-amber-900 via-stone-800 to-amber-950',
          ground: 'bg-gradient-to-t from-stone-900 to-amber-900/60 border-amber-600/60',
          mountains: 'fill-stone-900/80',
          silhouette1: '🛕 Candi Borobudur',
          silhouette2: '🗿 Gapura Wringin Lawang',
          npcAvatar: '🪓',
          bossAvatar: '👺'
        };
      case 'kesultanan-islam':
        return {
          sky: 'from-teal-950 via-emerald-900 to-stone-900',
          ground: 'bg-gradient-to-t from-stone-950 to-emerald-950 border-emerald-600/60',
          mountains: 'fill-emerald-950/80',
          silhouette1: '⛵ Perahu Pinisi Somba Opu',
          silhouette2: '🕌 Menara Masjid Demak',
          npcAvatar: '👳‍♂️',
          bossAvatar: '🌪️'
        };
      case 'kolonialisme':
        return {
          sky: 'from-rose-950 via-stone-900 to-red-950',
          ground: 'bg-gradient-to-t from-stone-950 to-stone-900 border-red-700/60',
          mountains: 'fill-red-950/80',
          silhouette1: '🏰 Benteng Duurstede',
          silhouette2: '💣 Meriam VOC Kuno',
          npcAvatar: '⚔️',
          bossAvatar: '🎩'
        };
      case 'sumpah-pemuda':
        return {
          sky: 'from-amber-950 via-red-900 to-stone-900',
          ground: 'bg-gradient-to-t from-stone-950 to-amber-950 border-red-500/60',
          mountains: 'fill-stone-900/80',
          silhouette1: '🏛️ Gedung Kramat Raya 106',
          silhouette2: '📻 Pegangsaan Timur 56',
          npcAvatar: '📜',
          bossAvatar: '👥'
        };
      case 'kemerdekaan':
        return {
          sky: 'from-indigo-950 via-purple-900 to-stone-950',
          ground: 'bg-gradient-to-t from-stone-950 to-indigo-950 border-purple-600/60',
          mountains: 'fill-purple-950/80',
          silhouette1: '🏢 Hotel Yamato Surabaya',
          silhouette2: '🏕️ Markas Gerilya Rimba',
          npcAvatar: '🪖',
          bossAvatar: '👑'
        };
    }
  };

  const theme = getEraThemeDetails();

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-4 text-amber-50">
      {/* Top Banner Navigation & Mission Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-900/90 border border-amber-700/70 p-3 sm:p-4 rounded-xl shadow-lg mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onBackToMap();
            }}
            className="p-2 rounded-lg bg-amber-900/80 hover:bg-amber-800 text-amber-200 border border-amber-600 flex items-center gap-1.5 text-xs font-bold transition"
          >
            <ArrowLeft size={16} />
            <span>Peta Wilayah</span>
          </button>

          <div>
            <span className="text-[11px] font-mono text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800 uppercase">
              Jalur 2D Side-Scroller
            </span>
            <h2 className="font-cinzel text-base sm:text-xl font-bold text-amber-100">
              {era.title} ({era.timePeriod})
            </h2>
          </div>
        </div>

        {/* Quick Travel Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              onOpenTrivia();
            }}
            className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold flex items-center gap-1.5 shadow transition"
          >
            <Sword size={14} />
            <span>Tantangan Kuis</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenChronology();
            }}
            className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-700 text-xs font-medium flex items-center gap-1.5 transition"
          >
            <Puzzle size={14} />
            <span className="hidden sm:inline">Minigame Kronologi</span>
            <span className="sm:hidden">Kronologi</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenMatching();
            }}
            className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-700 text-xs font-medium flex items-center gap-1.5 transition"
          >
            <Sparkles size={14} />
            <span className="hidden sm:inline">Pencocokan Tokoh</span>
            <span className="sm:hidden">Cocok</span>
          </button>
        </div>
      </div>

      {/* 2D Side-Scroller Viewport Stage */}
      <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border-2 border-amber-600 shadow-2xl bg-black select-none">
        {/* Parallax Layer 1: Sky & Stars / Clouds */}
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.sky}`}>
          {/* Subtle animated stars / dust */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />
          
          {/* Historical Era Silhouette Monuments in distance */}
          <div className="absolute top-10 left-12 text-xs font-pixel text-amber-300/40 tracking-wider">
            {theme.silhouette1}
          </div>
          <div className="absolute top-14 right-20 text-xs font-pixel text-amber-300/40 tracking-wider">
            {theme.silhouette2}
          </div>

          {/* Distant Mountain SVG silhouette */}
          <svg
            className="absolute bottom-28 w-full h-32 opacity-25"
            viewBox="0 0 1000 120"
            preserveAspectRatio="none"
          >
            <polygon
              className={theme.mountains}
              points="0,120 120,40 280,100 450,20 620,90 780,30 920,80 1000,120"
            />
          </svg>
        </div>

        {/* Parallax Layer 2: Ground, Pathway, & Scenery Obstacles */}
        <div className="absolute inset-x-0 bottom-0 h-28 border-t-4 bg-stone-900 border-amber-700">
          {/* Cobblestone / Pathway texture */}
          <div className="h-full w-full opacity-40 bg-[repeating-linear-gradient(45deg,#000_0,#000_10px,transparent_10px,transparent_20px)]" />
          
          {/* Ground flora / details */}
          <div className="absolute top-2 inset-x-0 flex justify-between px-6 text-stone-600 text-xs font-pixel">
            <span>🌿</span>
            <span>🪨</span>
            <span>🌱</span>
            <span>🪨</span>
            <span>🌿</span>
            <span>🪵</span>
            <span>🌱</span>
          </div>
        </div>

        {/* Floating Time Orbs to collect */}
        {[180, 380, 660].map((orbX, idx) => {
          if (collectedOrbs.includes(idx)) return null;
          return (
            <div
              key={idx}
              className="absolute bottom-36 -translate-x-1/2 flex flex-col items-center animate-bounce"
              style={{ left: `${(orbX / 960) * 100}%` }}
            >
              <div className="w-6 h-6 rounded-full bg-amber-400 text-stone-950 font-bold flex items-center justify-center text-xs shadow-[0_0_12px_#f59e0b] border border-white">
                ✨
              </div>
              <span className="text-[10px] text-amber-300 font-pixel mt-1">+50 pt</span>
            </div>
          );
        })}

        {/* Checkpoint Station 1: NPC Mentor Figure (at ~25% distance) */}
        <div
          className="absolute bottom-28 flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
          style={{ left: '25%' }}
          onClick={() => {
            sound.playClick();
            onOpenTrivia();
          }}
        >
          {/* Speech Bubble */}
          <div className="bg-amber-950/95 border-2 border-amber-400 text-amber-100 text-[11px] p-2 rounded-xl shadow-lg max-w-[170px] text-center mb-1 animate-pulse">
            <span className="font-bold text-amber-300 block">{era.npcName}</span>
            "Uji pemahamanmu bersamaku!"
          </div>
          
          {/* NPC Sprite */}
          <div className="relative flex flex-col items-center">
            <div className="w-12 h-14 bg-gradient-to-t from-amber-700 to-amber-500 rounded-lg border-2 border-amber-300 shadow-md flex items-center justify-center text-2xl">
              {theme.npcAvatar}
            </div>
            <div className="w-14 h-2 bg-black/60 rounded-full mt-1 blur-[2px]" />
          </div>

          <span className="text-[10px] font-pixel text-amber-300 bg-black/60 px-2 py-0.5 rounded mt-1 border border-stone-700">
            [1] Pos Tokoh Sejarah
          </span>
        </div>

        {/* Checkpoint Station 2: Minigame Time Rift (at ~55% distance) */}
        <div
          className="absolute bottom-28 flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
          style={{ left: '55%' }}
          onClick={() => {
            sound.playClick();
            onOpenChronology();
          }}
        >
          {/* Speech Bubble */}
          <div className="bg-stone-950/90 border border-yellow-400 text-yellow-200 text-[11px] p-2 rounded-xl shadow-lg max-w-[160px] text-center mb-1">
            <span className="font-bold text-yellow-400 block">Celah Waktu</span>
            Susun urutan kronologi sejarah!
          </div>

          {/* Time Rift Portal */}
          <div className="relative flex flex-col items-center">
            <div className="w-11 h-14 bg-gradient-to-t from-purple-800 to-indigo-500 rounded-full border-2 border-yellow-300 shadow-[0_0_15px_#a855f7] flex items-center justify-center text-xl animate-spin">
              ⏳
            </div>
            <div className="w-12 h-2 bg-black/60 rounded-full mt-1 blur-[2px]" />
          </div>

          <span className="text-[10px] font-pixel text-yellow-300 bg-black/60 px-2 py-0.5 rounded mt-1 border border-stone-700">
            [2] Minigame Kronologi
          </span>
        </div>

        {/* Checkpoint Station 3: Boss Arena Gate (at ~85% distance) */}
        <div
          className="absolute bottom-28 flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
          style={{ left: '85%' }}
          onClick={() => {
            sound.playClick();
            onOpenTrivia();
          }}
        >
          {/* Boss warning */}
          <div className="bg-rose-950/95 border-2 border-rose-500 text-rose-100 text-[11px] p-2 rounded-xl shadow-lg max-w-[170px] text-center mb-1 animate-pulse">
            <span className="font-bold text-rose-300 block">{era.bossName}</span>
            "Kembalikan artefak ini jika kau mampu!"
          </div>

          {/* Boss Sprite */}
          <div className="relative flex flex-col items-center">
            <div className="w-14 h-16 bg-gradient-to-t from-rose-900 to-rose-600 rounded-xl border-2 border-rose-400 shadow-[0_0_15px_#f43f5e] flex items-center justify-center text-3xl">
              {theme.bossAvatar}
            </div>
            <div className="w-16 h-2 bg-black/60 rounded-full mt-1 blur-[2px]" />
          </div>

          <span className="text-[10px] font-pixel text-rose-400 bg-black/60 px-2 py-0.5 rounded mt-1 border border-stone-700">
            [3] Pertarungan Bos
          </span>
        </div>

        {/* Player Character: Penjaga Waktu Muda */}
        <div
          className={`absolute bottom-28 z-20 flex flex-col items-center transition-all duration-100 ${
            isJumping ? '-translate-y-16' : 'translate-y-0'
          }`}
          style={{
            left: `${(playerX / 960) * 100}%`,
            transform: `translateX(-50%) ${direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'}`
          }}
        >
          {/* Timekeeper Character Model */}
          <div className="relative flex flex-col items-center">
            {/* Glowing Keris / Hourglass Aura */}
            <div className="absolute -top-3 w-8 h-8 rounded-full bg-amber-400/20 animate-ping pointer-events-none" />

            {/* Character Body / Head */}
            <div className="w-10 h-14 bg-gradient-to-b from-amber-400 via-amber-600 to-amber-800 rounded-xl border-2 border-amber-200 shadow-xl flex flex-col items-center justify-between p-1">
              {/* Head / Blangkon / Headband */}
              <div className="w-6 h-3 bg-red-700 rounded-t-md border-b border-amber-300" />
              {/* Eyes */}
              <div className="flex gap-1.5 my-0.5">
                <div className="w-1.5 h-1.5 bg-stone-900 rounded-full" />
                <div className="w-1.5 h-1.5 bg-stone-900 rounded-full" />
              </div>
              {/* Keris Waktu weapon */}
              <div className="text-xs">🗡️</div>
            </div>

            {/* Shadow */}
            <div className="w-10 h-2 bg-black/60 rounded-full mt-1 blur-[2px]" />
          </div>
        </div>

        {/* Interactive Action Prompt floating over player when near station */}
        {activeCheckpoint && (
          <div
            className="absolute bottom-48 z-30 -translate-x-1/2 bg-amber-500 text-stone-950 px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce border-2 border-stone-950 cursor-pointer flex items-center gap-1.5"
            style={{ left: `${(playerX / 960) * 100}%` }}
            onClick={triggerActiveAction}
          >
            <Zap size={14} />
            <span>Tekan [E] atau Klik di Sini!</span>
          </div>
        )}

        {/* Screen Controls & On-Screen D-Pad */}
        <div className="absolute bottom-3 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
          {/* Controls instructions */}
          <div className="bg-stone-950/80 px-3 py-1 rounded-lg border border-stone-700 text-[11px] text-amber-200/90 font-mono hidden sm:block">
            Gunakan tombol <kbd className="px-1.5 py-0.5 bg-stone-800 border rounded">←</kbd> <kbd className="px-1.5 py-0.5 bg-stone-800 border rounded">→</kbd> untuk bergerak, <kbd className="px-1.5 py-0.5 bg-stone-800 border rounded">Spasi</kbd> untuk melompat.
          </div>

          {/* Virtual Touch Controller for mobile / iframe click */}
          <div className="flex items-center gap-2 pointer-events-auto ml-auto">
            <button
              id="dpad-left"
              onMouseDown={() => {
                setDirection('left');
                setPlayerX((prev) => Math.max(prev - 35, 40));
              }}
              className="w-10 h-10 rounded-xl bg-stone-900/90 border-2 border-amber-600 text-amber-300 flex items-center justify-center active:bg-amber-600 active:text-black shadow-md"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              id="dpad-jump"
              onClick={() => {
                if (!isJumping) {
                  setIsJumping(true);
                  sound.playClick();
                  setTimeout(() => setIsJumping(false), 450);
                }
              }}
              className="w-10 h-10 rounded-xl bg-stone-900/90 border-2 border-amber-600 text-amber-300 flex items-center justify-center active:bg-amber-600 active:text-black shadow-md"
            >
              <ArrowUp size={18} />
            </button>

            <button
              id="dpad-right"
              onMouseDown={() => {
                setDirection('right');
                setPlayerX((prev) => Math.min(prev + 35, 920));
              }}
              className="w-10 h-10 rounded-xl bg-stone-900/90 border-2 border-amber-600 text-amber-300 flex items-center justify-center active:bg-amber-600 active:text-black shadow-md"
            >
              <ArrowRight size={18} />
            </button>

            {activeCheckpoint && (
              <button
                id="dpad-action"
                onClick={triggerActiveAction}
                className="h-10 px-3 rounded-xl bg-amber-500 border-2 border-amber-200 text-stone-950 font-bold text-xs flex items-center gap-1 active:bg-amber-400 shadow-md"
              >
                <Zap size={15} />
                <span>Interaksi</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Level Lore & Quest Description Box */}
      <div className="mt-4 p-4 rounded-xl bg-stone-900/90 border border-amber-800/80 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-300">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-950 border border-amber-700 text-amber-400 shrink-0">
            <Info size={18} />
          </div>
          <div>
            <span className="font-bold text-amber-200 block mb-0.5">
              Misi Penjaga Waktu Era Ini:
            </span>
            <p className="leading-relaxed">
              {era.npcQuote}
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-3 font-mono bg-black/40 px-3 py-2 rounded-lg border border-stone-800">
          <div>
            <div className="text-stone-400 text-[10px]">Bonus Kristal</div>
            <div className="text-amber-300 font-bold">+{bonusScore} pt</div>
          </div>
          <div className="h-6 w-px bg-stone-800" />
          <div>
            <div className="text-stone-400 text-[10px]">Artefak Sasaran</div>
            <div className="text-amber-200 font-bold text-[11px] truncate max-w-[120px]">{era.artifactName}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
