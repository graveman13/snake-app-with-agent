import { useEffect, useRef, useCallback } from 'react';
import { GameActionType } from '../types/game';
import { GAME_CONFIG } from '../config/gameConfig';

interface UseGameLoopProps {
  isPlaying: boolean;
  dispatch: (action: { type: GameActionType }) => void;
}

export const useGameLoop = ({ isPlaying, dispatch }: UseGameLoopProps) => {
  const gameLoopRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const gameStep = useCallback(() => {
    dispatch({ type: GameActionType.MOVE_SNAKE });
  }, [dispatch]);

  const gameLoop = useCallback((currentTime: number) => {
    if (currentTime - lastTimeRef.current >= GAME_CONFIG.INITIAL_SPEED) {
      gameStep();
      lastTimeRef.current = currentTime;
    }
    
    if (isPlaying) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
  }, [isPlaying, gameStep]);

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = performance.now();
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [isPlaying, gameLoop]);
};