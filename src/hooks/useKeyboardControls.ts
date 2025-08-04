import { useEffect, useCallback } from 'react';
import { Direction, GameActionType, GameStatus } from '../types/game';
import { KEY_MAPPINGS } from '../config/gameConfig';

interface UseKeyboardControlsProps {
  gameStatus: GameStatus;
  dispatch: (action: { type: GameActionType; payload?: Direction | undefined }) => void;
  onStartGame: () => void;
  onPauseGame: () => void;
  onResumeGame: () => void;
  onResetGame: () => void;
}

export const useKeyboardControls = ({
  gameStatus,
  dispatch,
  onStartGame,
  onPauseGame,
  onResumeGame,
  onResetGame
}: UseKeyboardControlsProps) => {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const { code } = event;

    // Пробіл для керування грою
    if (code === 'Space') {
      event.preventDefault();
      
      switch (gameStatus) {
        case 'ready':
          onStartGame();
          break;
        case 'playing':
          onPauseGame();
          break;
        case 'paused':
          onResumeGame();
          break;
        case 'gameOver':
          onResetGame();
          break;
      }
      return;
    }

    // Керування напрямком руху
    if (code in KEY_MAPPINGS && gameStatus === 'playing') {
      event.preventDefault();
      const direction = KEY_MAPPINGS[code as keyof typeof KEY_MAPPINGS] as Direction;
      dispatch({
        type: GameActionType.CHANGE_DIRECTION,
        payload: direction
      });
    }
  }, [gameStatus, dispatch, onStartGame, onPauseGame, onResumeGame, onResetGame]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
};