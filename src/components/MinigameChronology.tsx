import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowUp, 
  ArrowDown, 
  CheckCircle, 
  RotateCcw, 
  Sparkles, 
  Clock, 
  ArrowLeft,
  Trophy,
  HelpCircle
} from 'lucide-react';
import { EraId, EducationTier, ChronologyItem } from '../types';
import { MINIGAMES_DATA } from '../data/minigamesData';
import { ERAS_DATA } from '../data/erasData';
import { sound } from '../services/sound';

interface MinigameChronologyProps {
  eraId: EraId;
  tier: EducationTier;
  onComplete: (scoreBonus: number) => void;
  onExit: () => void;
}

export const MinigameChronology: React.FC<MinigameChronologyProps> = ({
  eraId,
  tier,
  onComplete,
  onExit
}) => {
  const era = ERAS_DATA.find((e) => e.id === eraId) || ERAS_DATA[0];

  // Find minigame for this era & tier
  const minigameSet = MINIGAMES_DATA.find(
    (m) => m.eraId === eraId && m.tier === tier
  ) || MINIGAMES_DATA[0];

  // Initial shuffled events
  const [items, setItems] = useState<ChronologyItem[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    // Shuffle the items for the puzzle
    const shuffled = [...minigameSet.chronologyEvents].sort(() => Math.random() - 0.5);
    setItems(shuffled);
    setIsSubmitted(false);
    setIsSuccess(false);
  }, [eraId, tier]);

  const moveUp = (index: number) => {
    if (index === 0 || isSubmitted) return;
    sound.playClick();
    const newItems = [...items];
    const temp = newItems[index - 1];
    newItems[index - 1] = newItems[index];
    newItems[index] = temp;
    setItems(newItems);
  };

  const moveDown = (index: number) => {
    if (index === items.length - 1 || isSubmitted) return;
    sound.playClick();
    const newItems = [...items];
    const temp = newItems[index + 1];
    newItems[index + 1] = newItems[index];
    newItems[index] = temp;
    setItems(newItems);
  };

  const checkOrder = () => {
    sound.playClick();
    setIsSubmitted(true);

    // Check if every item is strictly sorted by order
    let correct = true;
    for (let i = 0; i < items.length; i++) {
      if (items[i].order !== i + 1) {
        correct = false;
        break;
      }
    }

    if (correct) {
      setIsSuccess(true);
      sound.playVictory();
      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    } else {
      setIsSuccess(false);
      sound.playWrong();
    }
  };

  const handleFinish = () => {
    sound.playClick();
    // Award 250 bonus points
    onComplete(250);
  };

  const handleReset = () => {
    sound.playClick();
    const shuffled = [...minigameSet.chronologyEvents].sort(() => Math.random() - 0.5);
    setItems(shuffled);
    setIsSubmitted(false);
    setIsSuccess(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-3 sm:px-6 py-6 text-amber-50">
      {/* Header */}
      <div className="bg-stone-900/90 border-2 border-yellow-500/80 rounded-2xl p-4 sm:p-6 shadow-xl mb-6">
        <div className="flex items-center justify-between gap-3 mb-2">
          <button
            onClick={onExit}
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-200 border border-stone-700 text-xs flex items-center gap-1.5 transition"
          >
            <ArrowLeft size={16} />
            <span>Kembali</span>
          </button>

          <span className="text-xs font-pixel px-3 py-1 rounded-full bg-yellow-950 text-yellow-300 border border-yellow-600 uppercase tracking-widest">
            Minigame Celah Waktu: Urutan Kronologi
          </span>
        </div>

        <h2 className="font-cinzel text-xl sm:text-2xl font-black text-amber-100 mt-2">
          Rekonstruksi Garis Waktu {era.title}
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
          Penyihir Waktu telah mengacak peristiwa sejarah! Susun kembali kartu-kartu peristiwa di bawah ini dari yang <strong>paling awal (terdahulu)</strong> ke yang <strong>paling akhir (terbaru)</strong>.
        </p>
      </div>

      {/* Reorderable Items List */}
      <div className="space-y-3 mb-6">
        {items.map((item, index) => {
          const isCorrectPosition = item.order === index + 1;
          let borderStyle = 'border-stone-700 bg-stone-900/80';

          if (isSubmitted) {
            borderStyle = isCorrectPosition 
              ? 'border-emerald-500 bg-emerald-950/60 ring-1 ring-emerald-400' 
              : 'border-rose-500 bg-rose-950/60 ring-1 ring-rose-400';
          }

          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between gap-4 shadow-md ${borderStyle}`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-black/50 border border-stone-700 flex items-center justify-center font-mono font-bold text-amber-400 text-sm shrink-0">
                  {index + 1}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-yellow-400 bg-yellow-950/80 px-2 py-0.5 rounded border border-yellow-800">
                      {item.year}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-amber-100">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Up/Down buttons */}
              {!isSubmitted && (
                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    disabled={index === 0}
                    onClick={() => moveUp(index)}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed border border-stone-700 text-amber-300"
                    title="Pindahkan ke Atas"
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button
                    disabled={index === items.length - 1}
                    onClick={() => moveDown(index)}
                    className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed border border-stone-700 text-amber-300"
                    title="Pindahkan ke Bawah"
                  >
                    <ArrowDown size={16} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Result feedback message */}
      {isSubmitted && (
        <div className={`p-4 rounded-xl border-2 mb-6 text-center ${
          isSuccess 
            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100' 
            : 'bg-rose-950/80 border-rose-500 text-rose-100'
        }`}>
          <div className="text-2xl mb-1">{isSuccess ? '🎉' : '⚠️'}</div>
          <div className="font-cinzel text-lg font-bold">
            {isSuccess ? 'Garis Waktu Berhasil Dipulihkan!' : 'Urutan Masih Belum Tepat'}
          </div>
          <p className="text-xs max-w-md mx-auto mt-1 opacity-90">
            {isSuccess 
              ? 'Luar biasa! Kronologi sejarah tersusun dengan sempurna. Kamu mendapatkan bonus +250 Poin!'
              : 'Beberapa peristiwa masih tertukar. Perhatikan penanda tahun dan alur peristiwa sejarah lalu coba lagi!'}
          </p>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={handleReset}
          className="py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium text-xs flex items-center gap-1.5 transition"
        >
          <RotateCcw size={15} />
          <span>Acak Ulang</span>
        </button>

        {!isSubmitted ? (
          <button
            onClick={checkOrder}
            className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition"
          >
            <CheckCircle size={16} />
            <span>Periksa Urutan Waktu</span>
          </button>
        ) : isSuccess ? (
          <button
            onClick={handleFinish}
            className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition"
          >
            <Trophy size={16} />
            <span>Klaim Bonus (+250 pt) & Lanjut</span>
          </button>
        ) : (
          <button
            onClick={() => setIsSubmitted(false)}
            className="py-2.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow transition"
          >
            <span>Coba Susun Lagi</span>
          </button>
        )}
      </div>
    </div>
  );
};
