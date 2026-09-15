import React from 'react';
import { Sparkles, Shield, Clock, BookOpen, Check, X } from 'lucide-react';
import { EducationTier } from '../types';
import { sound } from '../services/sound';

interface TierSelectionModalProps {
  currentTier: EducationTier;
  onSelectTier: (tier: EducationTier) => void;
  onClose: () => void;
  isFirstTime?: boolean;
}

export const TierSelectionModal: React.FC<TierSelectionModalProps> = ({
  currentTier,
  onSelectTier,
  onClose,
  isFirstTime = false
}) => {
  const tiers: {
    id: EducationTier;
    title: string;
    levelName: string;
    ageRange: string;
    description: string;
    optionsCount: string;
    timeLimit: string;
    basePoints: string;
    features: string[];
    colorBorder: string;
    bgHover: string;
    accentBadge: string;
    icon: string;
  }[] = [
    {
      id: 'SD',
      title: 'Jenjang SD (Kelas 1–6)',
      levelName: 'Mode Penjelajah Muda',
      ageRange: '7 – 12 Tahun',
      description: 'Pengenalan tokoh pahlawan nasional, candi, bendera, tanggal penting, dan peninggalan bersejarah.',
      optionsCount: '3 Pilihan Ganda (A, B, C)',
      timeLimit: 'Santai (45 detik per soal)',
      basePoints: '+100 Poin per jawaban benar',
      features: [
        'Petunjuk visual dan ikon interaktif',
        'Pertanyaan ringkas dan mudah dipahami',
        'Tanpa penalti pengurangan waktu'
      ],
      colorBorder: 'border-emerald-500',
      bgHover: 'hover:border-emerald-400 hover:bg-emerald-950/40',
      accentBadge: 'bg-emerald-600 text-emerald-100',
      icon: '🌱'
    },
    {
      id: 'SMP',
      title: 'Jenjang SMP (Kelas 7–9)',
      levelName: 'Mode Pejuang Sejarah',
      ageRange: '13 – 15 Tahun',
      description: 'Pemahaman sebab-akibat peristiwa, isi perjanjian bersejarah, lokasi pertempuran, dan garis waktu.',
      optionsCount: '4 Pilihan Ganda (A, B, C, D)',
      timeLimit: 'Cepat (Batas 20 detik per soal)',
      basePoints: '+150 Poin per jawaban benar',
      features: [
        'Uji analisis perjanjian & taktik perang',
        'Tantangan kronologi multi-peristiwa',
        'Bonus waktu menjawab dihitung ke skor'
      ],
      colorBorder: 'border-amber-500',
      bgHover: 'hover:border-amber-400 hover:bg-amber-950/40',
      accentBadge: 'bg-amber-600 text-amber-100',
      icon: '⚔️'
    },
    {
      id: 'SMA',
      title: 'Jenjang SMA / SMK (Kelas 10–12)',
      levelName: 'Mode Ahli Historiografi',
      ageRange: '16 – 18 Tahun',
      description: 'Analisis dampak peristiwa, geopolitik, diplomasi, latar belakang ekonomi, serta telaah kutipan dokumen sejarah.',
      optionsCount: '4–5 Pilihan Ganda Analitis',
      timeLimit: 'Tantangan Ekstrem (20 detik + Penalti -3s jika salah)',
      basePoints: '+200 Poin per jawaban benar',
      features: [
        'Analisis dokumen primer & kutipan pidato tokoh',
        'Pertanyaan berpikir kritis (HOTS)',
        'Penalti waktu saat memilih jawaban salah'
      ],
      colorBorder: 'border-purple-500',
      bgHover: 'hover:border-purple-400 hover:bg-purple-950/40',
      accentBadge: 'bg-purple-600 text-purple-100',
      icon: '🏛️'
    }
  ];

  const handleChoose = (t: EducationTier) => {
    sound.playPowerUp();
    onSelectTier(t);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-stone-900 border-2 border-amber-600 rounded-2xl shadow-2xl p-4 sm:p-7 text-amber-50 my-auto">
        {!isFirstTime && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition"
          >
            <X size={18} />
          </button>
        )}

        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-900/70 border border-amber-500 text-amber-300 text-xs font-pixel tracking-widest uppercase mb-2">
            Pilih Tingkat Kesulitan Permainan
          </span>
          <h2 className="font-cinzel text-xl sm:text-3xl font-black text-amber-200">
            Pilih Jenjang Penjaga Waktu
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto mt-1.5">
            Bank soal, batas waktu, dan kompleksitas tantangan akan otomatis disesuaikan dengan jenjang pendidikan yang kamu pilih.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((item) => {
            const isSelected = currentTier === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleChoose(item.id)}
                className={`relative rounded-xl p-4 sm:p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  item.colorBorder
                } ${item.bgHover} ${
                  isSelected ? 'bg-amber-900/30 ring-2 ring-amber-400 scale-[1.02]' : 'bg-stone-800/80'
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-stone-950 font-bold text-[11px] px-2.5 py-0.5 rounded-full shadow flex items-center gap-1">
                    <Check size={12} strokeWidth={3} /> Mode Aktif
                  </div>
                )}

                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-3xl">{item.icon}</span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${item.accentBadge}`}>
                      {item.ageRange}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-lg font-bold text-amber-100">
                    {item.levelName}
                  </h3>
                  <div className="text-xs text-amber-400/90 font-medium mb-2">
                    {item.title}
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Rules Pill Specs */}
                  <div className="space-y-1.5 mb-4 text-xs font-mono">
                    <div className="bg-black/40 px-2 py-1 rounded border border-stone-700 flex items-center gap-1.5 text-stone-200">
                      <BookOpen size={13} className="text-amber-400" />
                      <span>{item.optionsCount}</span>
                    </div>
                    <div className="bg-black/40 px-2 py-1 rounded border border-stone-700 flex items-center gap-1.5 text-stone-200">
                      <Clock size={13} className="text-amber-400" />
                      <span>{item.timeLimit}</span>
                    </div>
                    <div className="bg-black/40 px-2 py-1 rounded border border-stone-700 flex items-center gap-1.5 text-amber-300 font-bold">
                      <Sparkles size={13} className="text-yellow-400" />
                      <span>{item.basePoints}</span>
                    </div>
                  </div>

                  {/* Bullet features */}
                  <ul className="space-y-1 text-[11px] text-stone-300">
                    {item.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChoose(item.id);
                  }}
                  className={`mt-5 w-full py-2 px-3 rounded-lg font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 ring-1 ring-amber-300'
                      : 'bg-stone-700 hover:bg-amber-600 text-amber-100'
                  }`}
                >
                  <Shield size={14} />
                  {isSelected ? 'Lanjutkan dengan Mode Ini' : `Pilih ${item.id}`}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-5 text-center text-xs text-stone-400">
          * Kamu dapat mengubah jenjang pendidikan kapan saja melalui menu atas tanpa kehilangan artefak yang telah dikumpulkan.
        </div>
      </div>
    </div>
  );
};
