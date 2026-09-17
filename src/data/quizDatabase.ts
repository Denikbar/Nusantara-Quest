import { Question, EraId, EducationTier } from '../types';
import { QUESTIONS_HINDU_BUDDHA } from './quiz/eraHinduBuddha';
import { QUESTIONS_KESULTANAN_ISLAM } from './quiz/eraIslam';
import { QUESTIONS_KOLONIALISME } from './quiz/eraKolonialisme';
import { QUESTIONS_SUMPAH_PEMUDA } from './quiz/eraSumpahPemuda';
import { QUESTIONS_KEMERDEKAAN } from './quiz/eraKemerdekaan';

/**
 * Bank Soal Lengkap "Nusantara Quest: Jejak Sejarah"
 * Terbagi dalam 5 Era Sejarah dan 3 Jenjang Pendidikan (SD, SMP, SMA/SMK).
 * Setiap jenjang per era memiliki minimal 10 pertanyaan (Total 150 soal).
 */
export const QUIZ_DATABASE: Question[] = [
  ...QUESTIONS_HINDU_BUDDHA,
  ...QUESTIONS_KESULTANAN_ISLAM,
  ...QUESTIONS_KOLONIALISME,
  ...QUESTIONS_SUMPAH_PEMUDA,
  ...QUESTIONS_KEMERDEKAAN,
];

/**
 * Mengambil daftar soal berdasarkan Era dan Jenjang Pendidikan
 */
export function getQuestionsByEraAndTier(eraId: EraId, tier: EducationTier): Question[] {
  return QUIZ_DATABASE.filter((q) => q.eraId === eraId && q.tier === tier);
}

/**
 * Mengambil ringkasan statistik jumlah soal
 */
export function getQuizStatistics(): Record<EraId, Record<EducationTier, number>> {
  const stats: Record<EraId, Record<EducationTier, number>> = {
    'hindu-buddha': { SD: 0, SMP: 0, SMA: 0 },
    'kesultanan-islam': { SD: 0, SMP: 0, SMA: 0 },
    'kolonialisme': { SD: 0, SMP: 0, SMA: 0 },
    'sumpah-pemuda': { SD: 0, SMP: 0, SMA: 0 },
    'kemerdekaan': { SD: 0, SMP: 0, SMA: 0 },
  };

  for (const q of QUIZ_DATABASE) {
    if (stats[q.eraId] && stats[q.eraId][q.tier] !== undefined) {
      stats[q.eraId][q.tier]++;
    }
  }

  return stats;
}
