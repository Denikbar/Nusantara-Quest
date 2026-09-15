/**
 * Nusantara Quest: Jejak Sejarah
 * RPG-Trivia Adventure 2D Side-Scroller Sejarah Indonesia
 * Untuk SD, SMP, SMA/SMK
 */

import React, { useState, useEffect } from 'react';
import { 
  EducationTier, 
  EraId, 
  Artifact, 
  Question 
} from './types';
import { ERAS_DATA, INITIAL_ARTIFACTS } from './data/erasData';
import { QUIZ_DATABASE } from './data/quizDatabase';
import { HeaderNav } from './components/HeaderNav';
import { EraMap } from './components/EraMap';
import { SideScrollerWorld } from './components/SideScrollerWorld';
import { QuizBattle } from './components/QuizBattle';
import { MinigameChronology } from './components/MinigameChronology';
import { MinigameMatching } from './components/MinigameMatching';
import { ArtifactMuseum } from './components/ArtifactMuseum';
import { TierSelectionModal } from './components/TierSelectionModal';
import { GameGuideModal } from './components/GameGuideModal';
import { sound } from './services/sound';

type ViewMode = 'map' | 'sidescroller' | 'trivia' | 'chronology' | 'matching';

export default function App() {
  // Local storage keys
  const STORAGE_KEY = 'nusantara_quest_save_v1';

  // State
  const [tier, setTier] = useState<EducationTier>('SD');
  const [unlockedEras, setUnlockedEras] = useState<EraId[]>(['hindu-buddha']);
  const [currentEra, setCurrentEra] = useState<EraId>('hindu-buddha');
  const [starsPerEra, setStarsPerEra] = useState<Record<EraId, number>>({
    'hindu-buddha': 0,
    'kesultanan-islam': 0,
    'kolonialisme': 0,
    'sumpah-pemuda': 0,
    'kemerdekaan': 0
  });
  const [scoresPerEra, setScoresPerEra] = useState<Record<EraId, number>>({
    'hindu-buddha': 0,
    'kesultanan-islam': 0,
    'kolonialisme': 0,
    'sumpah-pemuda': 0,
    'kemerdekaan': 0
  });
  const [artifacts, setArtifacts] = useState<Artifact[]>(INITIAL_ARTIFACTS);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [hearts, setHearts] = useState<number>(3);
  const [combo, setCombo] = useState<number>(1.0);

  // Active view mode
  const [viewMode, setViewMode] = useState<ViewMode>('map');

  // Modals
  const [isTierModalOpen, setIsTierModalOpen] = useState<boolean>(false);
  const [isMuseumOpen, setIsMuseumOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.tier) setTier(parsed.tier);
        if (parsed.unlockedEras) setUnlockedEras(parsed.unlockedEras);
        if (parsed.starsPerEra) setStarsPerEra(parsed.starsPerEra);
        if (parsed.scoresPerEra) setScoresPerEra(parsed.scoresPerEra);
        if (parsed.artifacts) setArtifacts(parsed.artifacts);
        if (parsed.totalScore) setTotalScore(parsed.totalScore);
      } else {
        // First time visitor prompt for education tier
        setIsFirstLaunch(true);
        setIsTierModalOpen(true);
      }
    } catch {
      // Local storage not accessible
    }
  }, []);

  // Save progress on change
  useEffect(() => {
    try {
      const dataToSave = {
        tier,
        unlockedEras,
        starsPerEra,
        scoresPerEra,
        artifacts,
        totalScore
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch {
      // ignore
    }
  }, [tier, unlockedEras, starsPerEra, scoresPerEra, artifacts, totalScore]);

  // Handle tier selection
  const handleSelectTier = (selectedTier: EducationTier) => {
    setTier(selectedTier);
    setIsTierModalOpen(false);
    setIsFirstLaunch(false);
  };

  // Switch era
  const handleSelectEra = (eraId: EraId) => {
    setCurrentEra(eraId);
    setViewMode('sidescroller');
  };

  // Start direct trivia from map or scroller
  const handleStartTrivia = (eraId: EraId = currentEra) => {
    setCurrentEra(eraId);
    setViewMode('trivia');
  };

  // Start side-scroller view
  const handleStartSideScroller = (eraId: EraId = currentEra) => {
    setCurrentEra(eraId);
    setViewMode('sidescroller');
  };

  // Level completion logic
  const handleCompleteLevel = (result: {
    eraId: EraId;
    scoreEarned: number;
    stars: number;
    accuracy: number;
    heartsRemaining: number;
  }) => {
    // 1. Update stars
    const currentStars = starsPerEra[result.eraId] || 0;
    const newStars = Math.max(currentStars, result.stars);
    setStarsPerEra((prev) => ({
      ...prev,
      [result.eraId]: newStars
    }));

    // 2. Update high score
    const currentHighScore = scoresPerEra[result.eraId] || 0;
    setScoresPerEra((prev) => ({
      ...prev,
      [result.eraId]: Math.max(currentHighScore, result.scoreEarned)
    }));

    // 3. Add to total score
    setTotalScore((prev) => prev + result.scoreEarned);

    // 4. Restore artifact of this era
    setArtifacts((prev) =>
      prev.map((art) => (art.eraId === result.eraId ? { ...art, restored: true } : art))
    );

    // 5. Unlock next era if >= 1 star earned
    const eraOrder: EraId[] = [
      'hindu-buddha',
      'kesultanan-islam',
      'kolonialisme',
      'sumpah-pemuda',
      'kemerdekaan'
    ];
    const currentIndex = eraOrder.indexOf(result.eraId);
    if (newStars >= 1 && currentIndex < eraOrder.length - 1) {
      const nextEra = eraOrder[currentIndex + 1];
      if (!unlockedEras.includes(nextEra)) {
        setUnlockedEras((prev) => [...prev, nextEra]);
      }
    }

    // Return to map
    setViewMode('map');
  };

  // Minigame completion
  const handleCompleteMinigame = (scoreBonus: number) => {
    setTotalScore((prev) => prev + scoreBonus);
    sound.playPowerUp();
    setViewMode('sidescroller');
  };

  // Reset progress
  const handleResetProgress = () => {
    if (window.confirm('Apakah kamu yakin ingin mereset seluruh progres petualangan?')) {
      sound.playClick();
      setUnlockedEras(['hindu-buddha']);
      setCurrentEra('hindu-buddha');
      setStarsPerEra({
        'hindu-buddha': 0,
        'kesultanan-islam': 0,
        'kolonialisme': 0,
        'sumpah-pemuda': 0,
        'kemerdekaan': 0
      });
      setScoresPerEra({
        'hindu-buddha': 0,
        'kesultanan-islam': 0,
        'kolonialisme': 0,
        'sumpah-pemuda': 0,
        'kemerdekaan': 0
      });
      setArtifacts(INITIAL_ARTIFACTS);
      setTotalScore(0);
      setViewMode('map');
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  };

  // Filter questions for current era and education tier
  const filteredQuestions: Question[] = QUIZ_DATABASE.filter(
    (q) => q.eraId === currentEra && q.tier === tier
  );

  return (
    <div className="min-h-screen bg-stone-950 text-amber-50 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Universal Top Navigation Header */}
      <HeaderNav
        tier={tier}
        onOpenTierModal={() => {
          sound.playClick();
          setIsTierModalOpen(true);
        }}
        hearts={hearts}
        score={totalScore}
        combo={combo}
        restoredCount={artifacts.filter((a) => a.restored).length}
        totalArtifacts={artifacts.length}
        onOpenMuseum={() => {
          sound.playClick();
          setIsMuseumOpen(true);
        }}
        onOpenGuide={() => {
          sound.playClick();
          setIsGuideOpen(true);
        }}
        onOpenMap={() => {
          sound.playClick();
          setViewMode('map');
        }}
        onResetProgress={handleResetProgress}
      />

      {/* Main Game Screen Router */}
      <main className="flex-1 flex flex-col justify-start">
        {viewMode === 'map' && (
          <EraMap
            unlockedEras={unlockedEras}
            starsPerEra={starsPerEra}
            scoresPerEra={scoresPerEra}
            artifacts={artifacts}
            currentEra={currentEra}
            onSelectEra={handleSelectEra}
            onStartBattle={handleStartTrivia}
            onStartSideScroller={handleStartSideScroller}
          />
        )}

        {viewMode === 'sidescroller' && (
          <SideScrollerWorld
            eraId={currentEra}
            onBackToMap={() => setViewMode('map')}
            onOpenTrivia={() => setViewMode('trivia')}
            onOpenChronology={() => setViewMode('chronology')}
            onOpenMatching={() => setViewMode('matching')}
            starsEarned={starsPerEra[currentEra] || 0}
          />
        )}

        {viewMode === 'trivia' && (
          <QuizBattle
            eraId={currentEra}
            tier={tier}
            questions={filteredQuestions}
            onCompleteLevel={handleCompleteLevel}
            onExit={() => setViewMode('sidescroller')}
          />
        )}

        {viewMode === 'chronology' && (
          <MinigameChronology
            eraId={currentEra}
            tier={tier}
            onComplete={handleCompleteMinigame}
            onExit={() => setViewMode('sidescroller')}
          />
        )}

        {viewMode === 'matching' && (
          <MinigameMatching
            eraId={currentEra}
            tier={tier}
            onComplete={handleCompleteMinigame}
            onExit={() => setViewMode('sidescroller')}
          />
        )}
      </main>

      {/* Tier Selection Modal (SD / SMP / SMA) */}
      {isTierModalOpen && (
        <TierSelectionModal
          currentTier={tier}
          onSelectTier={handleSelectTier}
          onClose={() => setIsTierModalOpen(false)}
          isFirstTime={isFirstLaunch}
        />
      )}

      {/* Artifacts Museum View Modal */}
      {isMuseumOpen && (
        <ArtifactMuseum
          artifacts={artifacts}
          onClose={() => setIsMuseumOpen(false)}
          onGoToEra={(eraId) => {
            setCurrentEra(eraId as EraId);
            setViewMode('sidescroller');
          }}
        />
      )}

      {/* Game Guide & Rules Modal */}
      {isGuideOpen && (
        <GameGuideModal onClose={() => setIsGuideOpen(false)} />
      )}

      {/* Footer credits & copyright */}
      <footer className="py-3 px-4 text-center text-xs text-stone-500 border-t border-stone-800/80 bg-stone-950">
        <p>
          <strong className="text-amber-400 font-cinzel">Nusantara Quest: Jejak Sejarah</strong> — Game Edukasi Sejarah Indonesia untuk SD, SMP, & SMA/SMK.
        </p>
      </footer>
    </div>
  );
}
