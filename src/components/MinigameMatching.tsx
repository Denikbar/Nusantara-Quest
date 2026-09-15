import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  Sparkles, 
  RotateCcw, 
  Trophy, 
  Check, 
  HelpCircle,
  Award
} from 'lucide-react';
import { EraId, EducationTier, MatchPair } from '../types';
import { MINIGAMES_DATA } from '../data/minigamesData';
import { ERAS_DATA } from '../data/erasData';
import { sound } from '../services/sound';

interface MinigameMatchingProps {
  eraId: EraId;
  tier: EducationTier;
  onComplete: (scoreBonus: number) => void;
  onExit: () => void;
}

interface CardItem {
  uid: string;
  pairId: string;
  text: string;
  type: 'left' | 'right';
  category: string;
}

export const MinigameMatching: React.FC<MinigameMatchingProps> = ({
  eraId,
  tier,
  onComplete,
  onExit
}) => {
  const era = ERAS_DATA.find((e) => e.id === eraId) || ERAS_DATA[0];

  const minigameSet = MINIGAMES_DATA.find(
    (m) => m.eraId === eraId && m.tier === tier
  ) || MINIGAMES_DATA[0];

  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [wrongAttemptPair, setWrongAttemptPair] = useState<[string, string] | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    initGame();
  }, [eraId, tier]);

  const initGame = () => {
    const rawPairs = minigameSet.matchPairs;
    const leftCards: CardItem[] = rawPairs.map((p) => ({
      uid: `left-${p.id}`,
      pairId: p.id,
      text: p.figureOrTerm,
      type: 'left',
      category: p.category
    }));
    const rightCards: CardItem[] = rawPairs.map((p) => ({
      uid: `right-${p.id}`,
      pairId: p.id,
      text: p.roleOrFact,
      type: 'right',
      category: p.category
    }));

    // Shuffle left and right independently
    const shuffledLeft = [...leftCards].sort(() => Math.random() - 0.5);
    const shuffledRight = [...rightCards].sort(() => Math.random() - 0.5);

    setCards([...shuffledLeft, ...shuffledRight]);
    setSelectedCard(null);
    setMatchedPairIds([]);
    setWrongAttemptPair(null);
    setIsCompleted(false);
  };

  const handleCardClick = (card: CardItem) => {
    if (matchedPairIds.includes(card.pairId) || wrongAttemptPair) return;

    sound.playClick();

    if (!selectedCard) {
      setSelectedCard(card);
      return;
    }

    if (selectedCard.uid === card.uid) {
      // Deselect
      setSelectedCard(null);
      return;
    }

    // Check match
    if (selectedCard.pairId === card.pairId && selectedCard.type !== card.type) {
      // MATCH SUCCESS
      sound.playCorrect();
      const newMatched = [...matchedPairIds, card.pairId];
      setMatchedPairIds(newMatched);
      setSelectedCard(null);

      // Check if all pairs matched
      if (newMatched.length === minigameSet.matchPairs.length) {
        setIsCompleted(true);
        sound.playVictory();
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      }
    } else {
      // WRONG MATCH
      sound.playWrong();
      setWrongAttemptPair([selectedCard.uid, card.uid]);
      setTimeout(() => {
        setWrongAttemptPair(null);
        setSelectedCard(null);
      }, 700);
    }
  };

  const leftCards = cards.filter((c) => c.type === 'left');
  const rightCards = cards.filter((c) => c.type === 'right');

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-6 text-amber-50">
      {/* Header */}
      <div className="bg-stone-900/90 border-2 border-emerald-500/80 rounded-2xl p-4 sm:p-6 shadow-xl mb-6">
        <div className="flex items-center justify-between gap-3 mb-2">
          <button
            onClick={onExit}
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-200 border border-stone-700 text-xs flex items-center gap-1.5 transition"
          >
            <ArrowLeft size={16} />
            <span>Kembali</span>
          </button>

          <span className="text-xs font-pixel px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-600 uppercase tracking-widest">
            Minigame Celah Waktu: Pencocokan Tokoh & Fakta
          </span>
        </div>

        <h2 className="font-cinzel text-xl sm:text-2xl font-black text-amber-100 mt-2">
          Pencocokan Sejarah {era.title}
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
          Pilih satu kartu tokoh/istilah di kolom kiri, lalu pasangkan dengan peran atau peristiwa penting yang sesuai di kolom kanan.
        </p>
      </div>

      {/* Matching Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Left Column: Figures / Terms */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-amber-300 font-pixel uppercase tracking-wider flex items-center gap-1.5">
            <span>👤 Tokoh & Istilah Sejarah</span>
          </div>

          {leftCards.map((card) => {
            const isMatched = matchedPairIds.includes(card.pairId);
            const isSelected = selectedCard?.uid === card.uid;
            const isWrong = wrongAttemptPair?.includes(card.uid);

            let style = 'bg-stone-900/80 border-stone-700 hover:border-amber-400 text-stone-200';

            if (isMatched) {
              style = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 opacity-80 cursor-default';
            } else if (isWrong) {
              style = 'bg-rose-950/80 border-rose-500 text-rose-200 animate-shake';
            } else if (isSelected) {
              style = 'bg-amber-950 border-amber-400 text-amber-100 ring-2 ring-amber-400 scale-[1.02]';
            }

            return (
              <div
                key={card.uid}
                onClick={() => handleCardClick(card)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 shadow ${style}`}
              >
                <div>
                  <span className="text-[10px] font-mono text-amber-400/80 bg-black/40 px-2 py-0.5 rounded border border-stone-700">
                    {card.category}
                  </span>
                  <div className="font-cinzel font-bold text-sm sm:text-base mt-1 text-amber-100">
                    {card.text}
                  </div>
                </div>

                {isMatched && <Check size={18} className="text-emerald-400" />}
              </div>
            );
          })}
        </div>

        {/* Right Column: Roles / Historical Facts */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-amber-300 font-pixel uppercase tracking-wider flex items-center gap-1.5">
            <span>📜 Peran & Fakta Bersejarah</span>
          </div>

          {rightCards.map((card) => {
            const isMatched = matchedPairIds.includes(card.pairId);
            const isSelected = selectedCard?.uid === card.uid;
            const isWrong = wrongAttemptPair?.includes(card.uid);

            let style = 'bg-stone-900/80 border-stone-700 hover:border-amber-400 text-stone-200';

            if (isMatched) {
              style = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 opacity-80 cursor-default';
            } else if (isWrong) {
              style = 'bg-rose-950/80 border-rose-500 text-rose-200 animate-shake';
            } else if (isSelected) {
              style = 'bg-amber-950 border-amber-400 text-amber-100 ring-2 ring-amber-400 scale-[1.02]';
            }

            return (
              <div
                key={card.uid}
                onClick={() => handleCardClick(card)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 shadow ${style}`}
              >
                <div className="text-xs sm:text-sm leading-relaxed">
                  {card.text}
                </div>

                {isMatched && <Check size={18} className="text-emerald-400 shrink-0" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion Banner */}
      {isCompleted && (
        <div className="p-5 rounded-xl border-2 border-emerald-500 bg-emerald-950/90 text-center mb-6 text-emerald-100 animate-fadeIn">
          <div className="text-3xl mb-1">🎉</div>
          <div className="font-cinzel text-xl font-bold">
            Semua Pasangan Sejarah Berhasil Dicocokkan!
          </div>
          <p className="text-xs sm:text-sm max-w-md mx-auto mt-1 opacity-90">
            Ingatan sejarah pada era {era.title} kini semakin kokoh. Bonus +250 Poin ditambahkan ke tokomu!
          </p>
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => onComplete(250)}
              className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition"
            >
              <Trophy size={16} />
              <span>Klaim Bonus (+250 pt) & Lanjut</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Footer Controls */}
      {!isCompleted && (
        <div className="flex items-center justify-between">
          <button
            onClick={initGame}
            className="py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium text-xs flex items-center gap-1.5 transition"
          >
            <RotateCcw size={15} />
            <span>Mulai Ulang Minigame</span>
          </button>

          <div className="text-xs text-amber-400/90 font-mono">
            Terselesaikan: <strong>{matchedPairIds.length}</strong> dari <strong>{minigameSet.matchPairs.length}</strong> Pasangan
          </div>
        </div>
      )}
    </div>
  );
};
