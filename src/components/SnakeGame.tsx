import React, { useReducer, useCallback } from 'react';
import { GameBoard } from './GameBoard';
import { GameUI } from './GameUI';
import { gameReducer, createInitialGameState } from '../reducers/gameReducer';
import { GameActionType } from '../types/game';
import { useGameLoop } from '../hooks/useGameLoop';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { COLORS } from '../config/gameConfig';

export const SnakeGame: React.FC = () => {
  const [gameState, dispatch] = useReducer(gameReducer, createInitialGameState());

  const isPlaying = gameState.status === 'playing';

  const handleStartGame = useCallback(() => {
    dispatch({ type: GameActionType.START_GAME });
  }, []);

  const handlePauseGame = useCallback(() => {
    dispatch({ type: GameActionType.PAUSE_GAME });
  }, []);

  const handleResumeGame = useCallback(() => {
    dispatch({ type: GameActionType.RESUME_GAME });
  }, []);

  const handleResetGame = useCallback(() => {
    dispatch({ type: GameActionType.RESET_GAME });
  }, []);

  useGameLoop({ isPlaying, dispatch });
  
  useKeyboardControls({
    gameStatus: gameState.status,
    dispatch,
    onStartGame: handleStartGame,
    onPauseGame: handlePauseGame,
    onResumeGame: handleResumeGame,
    onResetGame: handleResetGame
  });

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: COLORS.BACKGROUND,
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  };

  const titleStyle: React.CSSProperties = {
    color: COLORS.TEXT,
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>🐍 Snake Game</h1>
      
      <GameUI
        gameState={gameState}
        onStartGame={handleStartGame}
        onPauseGame={handlePauseGame}
        onResumeGame={handleResumeGame}
        onResetGame={handleResetGame}
      />
      
      <GameBoard gameState={gameState} />
    </div>
  );
};