export type EducationTier = 'SD' | 'SMP' | 'SMA';

export type EraId = 
  | 'hindu-buddha'
  | 'kesultanan-islam'
  | 'kolonialisme'
  | 'sumpah-pemuda'
  | 'kemerdekaan';

export interface EraInfo {
  id: EraId;
  title: string;
  subtitle: string;
  timePeriod: string;
  themeColor: string;
  badgeBg: string;
  bossName: string;
  bossTitle: string;
  npcName: string;
  npcTitle: string;
  npcQuote: string;
  artifactId: string;
  artifactName: string;
  artifactDescription: string;
  overview: string;
  backgroundMusicTheme: string;
}

export interface Question {
  id: string;
  eraId: EraId;
  tier: EducationTier;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
  visualHint?: string; // emoji or iconic representation
  sourceQuote?: string; // for SMA/SMK documentary or quote analysis
}

export type PowerUpType = 'bantuan-candi' | 'lentera-waktu' | 'sutra-kerajaan';

export interface PowerUp {
  type: PowerUpType;
  name: string;
  description: string;
  icon: string;
  remaining: number;
}

export interface Artifact {
  id: string;
  eraId: EraId;
  name: string;
  eraName: string;
  yearEstimate: string;
  originLocation: string;
  description: string;
  historicalSignificance: string;
  restored: boolean;
  unlockedAtTier?: EducationTier;
  iconSymbol: string;
}

export interface ChronologyItem {
  id: string;
  title: string;
  year: string;
  description: string;
  order: number;
}

export interface MatchPair {
  id: string;
  figureOrTerm: string;
  roleOrFact: string;
  category: string;
}

export interface MinigameData {
  eraId: EraId;
  tier: EducationTier;
  chronologyEvents: ChronologyItem[];
  matchPairs: MatchPair[];
}

export interface PlayerStats {
  score: number;
  combo: number;
  maxCombo: number;
  highestMultiplier: number;
  correctCount: number;
  totalAnswered: number;
  hearts: number;
}

export interface LevelResult {
  eraId: EraId;
  tier: EducationTier;
  score: number;
  stars: number;
  accuracy: number;
  timeBonus: number;
  isUnlockedNext: boolean;
  newArtifactRestored?: Artifact;
}
