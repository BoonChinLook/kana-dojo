'use client';
import { useCallback } from 'react';
import { achievementApi } from '@/shared/events';
import { useStatsDisplay } from '@/features/Progress';
import useStatsStore from '@/features/Progress/store/useStatsStore';

/**
 * Stats Hook - Compatibility layer for existing code
 *
 * NOTE: New code should use statsApi directly instead of this hook.
 * This hook exists for backwards compatibility during migration.
 *
 * @deprecated Prefer using statsApi.recordCorrect() and statsApi.recordIncorrect() directly
 */
const useStats = () => {
  const { characterHistory } = useStatsDisplay();
  const statsStore = useStatsStore();

  // Compatibility wrappers for old API
  const incrementCorrectAnswers = useCallback(() => {
    statsStore.incrementCorrectAnswers();
    // Trigger achievement check
    achievementApi.triggerCheck();
  }, [statsStore]);

  const incrementWrongAnswers = useCallback(() => {
    statsStore.incrementWrongAnswers();
    // Trigger achievement check
    achievementApi.triggerCheck();
  }, [statsStore]);

  const addCharacterToHistory = useCallback((character: string) => {
    statsStore.addCharacterToHistory(character);
  }, [statsStore]);

  const addCorrectAnswerTime = useCallback((time: number) => {
    statsStore.addCorrectAnswerTime(time);
  }, [statsStore]);

  const incrementCharacterScore = useCallback(
    (character: string, field: 'correct' | 'wrong') => {
      statsStore.incrementCharacterScore(character, field);
    },
    [statsStore],
  );

  return {
    incrementCorrectAnswers,
    incrementWrongAnswers,
    addCharacterToHistory,
    characterHistory,
    addCorrectAnswerTime,
    correctAnswerTimes: [], // No longer tracked
    incrementCharacterScore,
  };
};

export default useStats;
