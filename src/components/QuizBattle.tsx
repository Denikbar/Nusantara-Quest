import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  Clock, 
  Sparkles, 
  ShieldAlert, 
  HelpCircle, 
  RotateCcw, 
  ArrowRight, 
  Star, 
  Trophy, 
  Flame,
  Award,
  Zap,
  CheckCircle2,
  XCircle,
  EyeOff,
  FastForward,
  Hourglass
} from 'lucide-react';
import { Question, EducationTier, EraId, EraInfo, PowerUpType, Artifact } from '../types';
import { ERAS_DATA } from '../data/erasData';
import { sound } from '../services/sound';

interface QuizBattleProps {
  eraId: EraId;
  tier: EducationTier;
  questions: Question[];
  onCompleteLevel: (result: {
    eraId: EraId;
    scoreEarned: number;
    stars: number;
    accuracy: number;
    heartsRemaining: number;
  }) => void;
  onExit: () => void;
}

export const QuizBattle: React.FC<QuizBattleProps> = ({
  eraId,
  tier,
  questions,
  onCompleteLevel,
  onExit
}) => {
  const era: EraInfo = ERAS_DATA.find((e) => e.id === eraId) || ERAS_DATA[0];

  // Game state
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [hearts, setHearts] = useState<number>(3);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);

  // Animation states
  const [isPlayerAttacking, setIsPlayerAttacking] = useState<boolean>(false);
  const [isBossAttacking, setIsBossAttacking] = useState<boolean>(false);
  const [bossHp, setBossHp] = useState<number>(100);

  // Power-ups limited to 1 use per type per battle
  const [usedPowerUps, setUsedPowerUps] = useState<Record<PowerUpType, boolean>>({
    'bantuan-candi': false,
    'lentera-waktu': false,
    'sutra-kerajaan': false
  });

  // Level flow states
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isVictory, setIsVictory] = useState<boolean>(false);

  // Time limit configuration based on education tier:
  // SD: 45s, SMP: 20s, SMA: 20s
  const initialTime = tier === 'SD' ? 45 : 20;
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  const currentQ: Question | undefined = questions[currentIdx];

  // Boss HP per question ratio
  const hpStep = 100 / (questions.length || 1);

  // Timer countdown
  useEffect(() => {
    if (isAnswerRevealed || isGameOver || isVictory || !currentQ) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIdx, isAnswerRevealed, isGameOver, isVictory]);

  const handleTimeOut = () => {
    sound.playWrong();
    setIsAnswerRevealed(true);
    setCombo(0);
    setHearts((prev) => {
      const nextH = prev - 1;
      if (nextH <= 0) {
        setIsGameOver(true);
        sound.playGameOver();
      }
      return Math.max(0, nextH);
    });
  };

  // Base score calculation based on tier:
  // SD: 100, SMP: 150, SMA: 200
  const getBasePoints = (): number => {
    switch (tier) {
      case 'SD': return 100;
      case 'SMP': return 150;
      case 'SMA': return 200;
    }
  };

  // Combo multiplier:
  // 0-1: 1.0x, 2: 1.2x, 3: 1.5x, 4+: 2.0x
  const getMultiplier = (currentCombo: number): number => {
    if (currentCombo >= 4) return 2.0;
    if (currentCombo === 3) return 1.5;
    if (currentCombo === 2) return 1.2;
    return 1.0;
  };

  const handleOptionClick = (optionIdx: number) => {
    if (isAnswerRevealed || isGameOver || isVictory || !currentQ) return;
    if (eliminatedOptions.includes(optionIdx)) return;

    sound.playClick();
    setSelectedOption(optionIdx);
    setIsAnswerRevealed(true);

    const isCorrect = optionIdx === currentQ.correctAnswer;

    if (isCorrect) {
      // Correct answer!
      sound.playCorrect();
      setIsPlayerAttacking(true);
      setTimeout(() => {
        setIsPlayerAttacking(false);
        sound.playHit();
      }, 350);

      setBossHp((prev) => Math.max(0, prev - hpStep));

      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      setCorrectAnswersCount((prev) => prev + 1);

      // Score = (BasePoints * Multiplier) + TimeBonus
      const mult = getMultiplier(newCombo);
      const timeBonus = timeLeft * 10;
      const earned = Math.round(getBasePoints() * mult) + timeBonus;
      setScore((prev) => prev + earned);
    } else {
      // Wrong answer!
      sound.playWrong();
      setIsBossAttacking(true);
      setTimeout(() => {
        setIsBossAttacking(false);
        sound.playHit();
      }, 350);

      setCombo(0);

      // SMA penalty: -3s if question continued, or heart reduction
      const nextHearts = hearts - 1;
      setHearts(Math.max(0, nextHearts));

      if (nextHearts <= 0) {
        setTimeout(() => {
          setIsGameOver(true);
          sound.playGameOver();
        }, 500);
      }
    }
  };

  // Power-up 1: Bantuan Candi (Removes 2 incorrect choices)
  const useBantuanCandi = () => {
    if (usedPowerUps['bantuan-candi'] || isAnswerRevealed || !currentQ) return;
    sound.playPowerUp();
    setUsedPowerUps((prev) => ({ ...prev, 'bantuan-candi': true }));

    const wrongIndexes = currentQ.options
      .map((_, i) => i)
      .filter((i) => i !== currentQ.correctAnswer);

    // Shuffle and pick 2 to eliminate
    const shuffled = wrongIndexes.sort(() => Math.random() - 0.5);
    const toEliminate = shuffled.slice(0, 2);
    setEliminatedOptions(toEliminate);
  };

  // Power-up 2: Lentera Waktu (+15 Seconds)
  const useLenteraWaktu = () => {
    if (usedPowerUps['lentera-waktu'] || isAnswerRevealed) return;
    sound.playPowerUp();
    setUsedPowerUps((prev) => ({ ...prev, 'lentera-waktu': true }));
    setTimeLeft((prev) => prev + 15);
  };

  // Power-up 3: Sutra Kerajaan (Skip Question safely with base points)
  const useSutraKerajaan = () => {
    if (usedPowerUps['sutra-kerajaan'] || isAnswerRevealed || !currentQ) return;
    sound.playPowerUp();
    setUsedPowerUps((prev) => ({ ...prev, 'sutra-kerajaan': true }));
    
    // Grant base score and proceed
    setScore((prev) => prev + getBasePoints());
    setCorrectAnswersCount((prev) => prev + 1);
    setBossHp((prev) => Math.max(0, prev - hpStep));
    nextQuestion();
  };

  const nextQuestion = () => {
    sound.playClick();
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setEliminatedOptions([]);
    setTimeLeft(initialTime);

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Victory!
      finishBattle();
    }
  };

  const finishBattle = () => {
    setIsVictory(true);
    sound.playVictory();
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const calculateStars = (): number => {
    const accuracy = (correctAnswersCount / (questions.length || 1)) * 100;
    if (accuracy === 100) return 3;
    if (accuracy >= 80) return 2;
    if (accuracy >= 50) return 1;
    return 0;
  };

  const handleFinishAndSubmit = () => {
    const stars = calculateStars();
    const accuracy = Math.round((correctAnswersCount / (questions.length || 1)) * 100);
    onCompleteLevel({
      eraId,
      scoreEarned: score,
      stars: Math.max(1, stars), // passing grants at least 1 star
      accuracy,
      heartsRemaining: hearts
    });
  };

  const restartQuiz = () => {
    sound.playClick();
    setCurrentIdx(0);
    setHearts(3);
    setScore(0);
    setCombo(0);
    setCorrectAnswersCount(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setEliminatedOptions([]);
    setIsGameOver(false);
    setIsVictory(false);
    setBossHp(100);
    setTimeLeft(initialTime);
    setUsedPowerUps({
      'bantuan-candi': false,
      'lentera-waktu': false,
      'sutra-kerajaan': false
    });
  };

  // If no questions in bank for this tier
  if (!currentQ) {
    return (
      <div className="p-8 text-center text-amber-200">
        <p>Tidak ada soal yang ditemukan untuk era ini pada jenjang {tier}.</p>
        <button onClick={onExit} className="mt-4 px-4 py-2 bg-amber-600 rounded">
          Kembali
        </button>
      </div>
    );
  }

  // GAME OVER VIEW
  if (isGameOver) {
    return (
      <div className="max-w-2xl mx-auto my-8 p-6 sm:p-8 bg-stone-900 border-2 border-rose-700 rounded-2xl shadow-2xl text-center text-amber-50">
        <div className="w-16 h-16 mx-auto mb-3 bg-rose-950/80 border-2 border-rose-500 rounded-full flex items-center justify-center text-3xl animate-pulse">
          💀
        </div>
        <span className="text-xs font-pixel uppercase tracking-widest text-rose-400 bg-rose-950 px-3 py-1 rounded-full border border-rose-800">
          Garis Waktu Terdistorsi!
        </span>
        <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-rose-200 mt-2">
          Energi Penjaga Waktu Habis
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto mt-2 leading-relaxed">
          {era.bossName} berhasil mengacaukan kembali ingatan sejarah nusantara. Bangkit dan pulihkan kembali garis waktu!
        </p>

        <div className="my-6 p-4 rounded-xl bg-black/40 border border-stone-800 flex justify-around font-mono text-sm">
          <div>
            <div className="text-stone-400 text-xs">Jawaban Benar</div>
            <div className="text-amber-300 font-bold text-lg">{correctAnswersCount}/{questions.length}</div>
          </div>
          <div className="h-10 w-px bg-stone-800" />
          <div>
            <div className="text-stone-400 text-xs">Skor Terkumpul</div>
            <div className="text-amber-200 font-bold text-lg">{score.toLocaleString('id-ID')} pts</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={restartQuiz}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition"
          >
            <RotateCcw size={16} />
            <span>Coba Lagi dari Awal</span>
          </button>
          <button
            onClick={onExit}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium text-sm transition"
          >
            Kembali ke Peta Wilayah
          </button>
        </div>
      </div>
    );
  }

  // VICTORY VIEW
  if (isVictory) {
    const stars = calculateStars();
    const accuracy = Math.round((correctAnswersCount / questions.length) * 100);

    return (
      <div className="max-w-2xl mx-auto my-8 p-6 sm:p-8 bg-gradient-to-b from-stone-900 via-amber-950 to-stone-900 border-2 border-amber-400 rounded-2xl shadow-2xl text-center text-amber-50">
        <div className="w-16 h-16 mx-auto mb-3 bg-amber-500/20 border-2 border-amber-400 rounded-full flex items-center justify-center text-3xl shadow-[0_0_20px_#f59e0b]">
          🏆
        </div>
        <span className="text-xs font-pixel uppercase tracking-widest text-amber-300 bg-amber-950 px-3 py-1 rounded-full border border-amber-700">
          Kemenangan Pemulihan Garis Waktu!
        </span>
        <h2 className="font-cinzel text-2xl sm:text-4xl font-black text-amber-100 mt-2">
          Artefak Berhasil Diselamatkan!
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto mt-2 leading-relaxed">
          Kamu telah mengalahkan <strong className="text-rose-400">{era.bossName}</strong> dan memulihkan <strong className="text-amber-300">{era.artifactName}</strong> ke museum sejarah peradaban bangsa.
        </p>

        {/* Stars Earned */}
        <div className="my-6 flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <Star
              key={s}
              size={36}
              className={`transition-all duration-500 ${
                s <= stars
                  ? 'fill-yellow-400 text-yellow-400 scale-110 drop-shadow-[0_0_12px_#eab308]'
                  : 'text-stone-700 scale-90'
              }`}
            />
          ))}
        </div>

        {/* Victory Score Stats Card */}
        <div className="p-4 rounded-xl bg-black/50 border border-amber-800/80 grid grid-cols-3 gap-2 font-mono text-center mb-6">
          <div>
            <div className="text-[11px] text-stone-400">Total Skor</div>
            <div className="text-amber-300 font-bold text-lg sm:text-xl">
              {score.toLocaleString('id-ID')}
            </div>
          </div>
          <div className="border-x border-stone-800">
            <div className="text-[11px] text-stone-400">Akurasi</div>
            <div className="text-emerald-400 font-bold text-lg sm:text-xl">
              {accuracy}%
            </div>
          </div>
          <div>
            <div className="text-[11px] text-stone-400">Max Combo</div>
            <div className="text-yellow-400 font-bold text-lg sm:text-xl">
              {maxCombo}x 🔥
            </div>
          </div>
        </div>

        {/* Restored Artifact Badge */}
        <div className="mb-6 p-3 rounded-xl bg-amber-900/30 border border-amber-500/60 flex items-center gap-3 text-left">
          <div className="text-3xl p-2 bg-amber-950 rounded-lg border border-amber-600">
            ✨
          </div>
          <div>
            <span className="text-[10px] font-pixel text-amber-400 uppercase">Artefak Ditambahkan ke Museum</span>
            <div className="font-cinzel text-sm font-bold text-amber-100">{era.artifactName}</div>
            <div className="text-[11px] text-stone-300 line-clamp-1">{era.artifactDescription}</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleFinishAndSubmit}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl transition hover:scale-105"
          >
            <Trophy size={18} />
            <span>Klaim Prestasi & Buka Wilayah</span>
          </button>
        </div>
      </div>
    );
  }

  // ACTIVE QUIZ BATTLE INTERFACE
  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 text-amber-50">
      {/* Top Combat Status Bar */}
      <div className="bg-stone-900/90 border border-amber-700/80 rounded-2xl p-4 shadow-xl mb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left: Era Title & Question progress */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-pixel uppercase px-2 py-0.5 rounded bg-amber-950 border border-amber-700 text-amber-300">
                {era.title}
              </span>
              <span className="text-xs text-amber-400 font-mono font-bold">
                Soal {currentIdx + 1} / {questions.length}
              </span>
            </div>
            <div className="text-xs text-stone-400 mt-0.5">
              Topik: <strong className="text-amber-200">{currentQ.topic}</strong>
            </div>
          </div>

          {/* Center: Timer bar & remaining seconds */}
          <div className="flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-xl border border-stone-800">
            <Clock size={16} className={timeLeft <= 5 ? 'text-rose-500 animate-spin' : 'text-amber-400'} />
            <div>
              <div className="flex items-center gap-1.5 font-mono text-sm font-bold">
                <span className={timeLeft <= 5 ? 'text-rose-400 animate-pulse' : 'text-amber-200'}>
                  {timeLeft}s
                </span>
                <span className="text-[10px] text-stone-400 font-normal">
                  {tier === 'SMA' ? '(Penalti -3s)' : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Combo & Score Tracker */}
          <div className="flex items-center gap-3">
            <div className="text-right font-mono">
              <div className="text-[10px] text-stone-400">Skor Kuis</div>
              <div className="text-sm sm:text-base font-black text-amber-300">
                {score.toLocaleString('id-ID')} pts
              </div>
            </div>

            {combo > 1 && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500 text-amber-300 font-bold text-xs animate-pulse">
                <Flame size={14} className="text-amber-400" />
                <span>x{getMultiplier(combo).toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Timer progress bar visual */}
        <div className="w-full bg-stone-950 h-1.5 rounded-full overflow-hidden mt-3 border border-stone-800">
          <div
            className={`h-full transition-all duration-1000 ${
              timeLeft <= 5 ? 'bg-rose-500' : 'bg-gradient-to-r from-amber-500 to-amber-300'
            }`}
            style={{ width: `${(timeLeft / initialTime) * 100}%` }}
          />
        </div>
      </div>

      {/* Duel Arena Canvas Header */}
      <div className="relative overflow-hidden rounded-2xl bg-stone-950 border-2 border-amber-600/80 p-4 shadow-2xl mb-4">
        {/* Background Arena FX */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 flex items-center justify-between gap-4">
          {/* Left Fighter: Penjaga Waktu Muda (Player) */}
          <div className={`flex items-center gap-3 transition-transform duration-200 ${
            isPlayerAttacking ? 'translate-x-12 scale-110' : ''
          }`}>
            <div className="relative">
              <div className="w-12 h-14 bg-gradient-to-t from-amber-700 to-amber-500 rounded-xl border-2 border-amber-300 shadow-md flex items-center justify-center text-2xl">
                🛡️
              </div>
              {/* Hearts Indicator */}
              <div className="flex items-center gap-0.5 absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-black/80 px-1.5 py-0.5 rounded-full border border-stone-700">
                {[1, 2, 3].map((h) => (
                  <Heart
                    key={h}
                    size={11}
                    className={h <= hearts ? 'fill-rose-500 text-rose-500' : 'text-stone-700'}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="font-cinzel text-xs sm:text-sm font-bold text-amber-200">
                Penjaga Waktu
              </div>
              <div className="text-[10px] text-amber-400/80 font-mono">
                {tier === 'SMA' ? 'SMA / SMK' : tier} Mode
              </div>
            </div>
          </div>

          {/* VS Divider */}
          <div className="font-pixel text-xl sm:text-2xl font-bold text-amber-500/80 tracking-widest animate-pulse">
            VS
          </div>

          {/* Right Fighter: Time Guardian Boss */}
          <div className={`flex items-center gap-3 text-right transition-transform duration-200 ${
            isBossAttacking ? '-translate-x-12 scale-110' : ''
          }`}>
            <div>
              <div className="font-cinzel text-xs sm:text-sm font-bold text-rose-300">
                {era.bossName}
              </div>
              {/* Boss HP Bar */}
              <div className="w-24 sm:w-32 bg-stone-900 h-2 rounded-full overflow-hidden border border-rose-900 mt-1">
                <div
                  className="bg-rose-500 h-full transition-all duration-300"
                  style={{ width: `${bossHp}%` }}
                />
              </div>
            </div>
            <div className="w-12 h-14 bg-gradient-to-t from-rose-950 to-rose-700 rounded-xl border-2 border-rose-400 shadow-md flex items-center justify-center text-2xl">
              👺
            </div>
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-stone-900/95 border-2 border-amber-600 rounded-2xl p-5 sm:p-7 shadow-2xl mb-4">
        {/* Quote / Document Source for SMA/SMK */}
        {currentQ.sourceQuote && (
          <div className="mb-4 p-3 rounded-xl bg-amber-950/40 border-l-4 border-amber-500 text-xs italic text-amber-200/90 font-serif">
            {currentQ.sourceQuote}
          </div>
        )}

        {/* Question Text with visual icon */}
        <div className="flex items-start gap-3 mb-6">
          {currentQ.visualHint && (
            <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-600 text-xl flex items-center justify-center shrink-0 shadow">
              {currentQ.visualHint}
            </div>
          )}
          <h3 className="text-base sm:text-lg font-bold text-amber-50 leading-relaxed">
            {currentQ.question}
          </h3>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isEliminated = eliminatedOptions.includes(idx);
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctAnswer;

            let btnStyle = 'border-stone-700 bg-stone-800/80 hover:border-amber-500 hover:bg-stone-800 text-stone-200';

            if (isAnswerRevealed) {
              if (isCorrect) {
                btnStyle = 'border-emerald-500 bg-emerald-950/70 text-emerald-100 ring-2 ring-emerald-400 font-bold';
              } else if (isSelected) {
                btnStyle = 'border-rose-500 bg-rose-950/70 text-rose-200 ring-2 ring-rose-400 line-through';
              } else {
                btnStyle = 'border-stone-800 bg-stone-950/40 text-stone-600 opacity-50';
              }
            } else if (isEliminated) {
              btnStyle = 'border-stone-900 bg-stone-950/20 text-stone-700 opacity-25 cursor-not-allowed';
            }

            const letters = ['A', 'B', 'C', 'D', 'E'];

            return (
              <button
                key={idx}
                disabled={isAnswerRevealed || isEliminated}
                onClick={() => handleOptionClick(idx)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between gap-3 text-xs sm:text-sm ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-black/40 border border-stone-700 flex items-center justify-center font-mono font-bold text-amber-300 shrink-0 text-xs">
                    {letters[idx]}
                  </span>
                  <span className="leading-snug">{option}</span>
                </div>

                {isAnswerRevealed && isCorrect && (
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                )}
                {isAnswerRevealed && isSelected && !isCorrect && (
                  <XCircle size={18} className="text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Answer Explanation Box when revealed */}
        {isAnswerRevealed && (
          <div className="mt-5 p-4 rounded-xl bg-amber-950/50 border border-amber-600/70 text-xs text-amber-100/90 animate-fadeIn">
            <span className="font-bold text-amber-300 block mb-1">
              {selectedOption === currentQ.correctAnswer ? 'Jawaban Benar!' : 'Penjelasan Sejarah:'}
            </span>
            <p className="leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}

        {/* Next Question / Proceed Button */}
        {isAnswerRevealed && (
          <div className="mt-5 flex justify-end">
            <button
              onClick={nextQuestion}
              className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
            >
              <span>{currentIdx + 1 < questions.length ? 'Lanjut ke Soal Berikutnya' : 'Selesaikan Pertarungan'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Bottom Power-Ups Bar (Bantuan Candi, Lentera Waktu, Sutra Kerajaan) */}
      <div className="bg-stone-900/90 border border-amber-800 rounded-xl p-3 shadow-lg flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs font-mono text-stone-400 flex items-center gap-1.5">
          <Zap size={14} className="text-amber-400" />
          <span>Bantuan Khusus (1x Pakai per Sesi):</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Powerup 1: Bantuan Candi (50:50) */}
          <button
            onClick={useBantuanCandi}
            disabled={usedPowerUps['bantuan-candi'] || isAnswerRevealed}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition ${
              usedPowerUps['bantuan-candi'] || isAnswerRevealed
                ? 'bg-stone-950 border-stone-800 text-stone-600 opacity-50 cursor-not-allowed'
                : 'bg-amber-900/60 border-amber-600 text-amber-200 hover:bg-amber-800'
            }`}
            title="Hapus 2 pilihan jawaban salah"
          >
            <EyeOff size={13} />
            <span>Bantuan Candi (50:50)</span>
          </button>

          {/* Powerup 2: Lentera Waktu (+15s) */}
          <button
            onClick={useLenteraWaktu}
            disabled={usedPowerUps['lentera-waktu'] || isAnswerRevealed}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition ${
              usedPowerUps['lentera-waktu'] || isAnswerRevealed
                ? 'bg-stone-950 border-stone-800 text-stone-600 opacity-50 cursor-not-allowed'
                : 'bg-amber-900/60 border-amber-600 text-amber-200 hover:bg-amber-800'
            }`}
            title="Tambah +15 detik waktu menjawab"
          >
            <Hourglass size={13} />
            <span>Lentera Waktu (+15s)</span>
          </button>

          {/* Powerup 3: Sutra Kerajaan (Skip) */}
          <button
            onClick={useSutraKerajaan}
            disabled={usedPowerUps['sutra-kerajaan'] || isAnswerRevealed}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition ${
              usedPowerUps['sutra-kerajaan'] || isAnswerRevealed
                ? 'bg-stone-950 border-stone-800 text-stone-600 opacity-50 cursor-not-allowed'
                : 'bg-amber-900/60 border-amber-600 text-amber-200 hover:bg-amber-800'
            }`}
            title="Lewati soal ini dengan aman dan raih poin dasar"
          >
            <FastForward size={13} />
            <span>Sutra Kerajaan (Lewati)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
