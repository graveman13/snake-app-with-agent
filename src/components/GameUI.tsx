import React from 'react';
import type { GameState } from '../types/game';
import { COLORS } from '../config/gameConfig';

interface GameUIProps {
  gameState: GameState;
  onStartGame: () => void;
  onPauseGame: () => void;
  onResumeGame: () => void;
  onResetGame: () => void;
}

export const GameUI: React.FC<GameUIProps> = React.memo(({ 
  gameState, 
  onStartGame, 
  onPauseGame, 
  onResumeGame, 
  onResetGame 
}) => {
  const { score, status } = gameState;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
    color: COLORS.TEXT,
    fontFamily: 'Arial, sans-serif'
  };

  const scoreStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold'
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: COLORS.SNAKE_HEAD,
    color: COLORS.BACKGROUND,
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'opacity 0.2s'
  };

  const statusMessageStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center'
  };

  const getStatusMessage = (): string => {
    switch (status) {
      case 'ready':
        return 'Натисни "Почати гру" або пробіл для початку';
      case 'playing':
        return 'Гра триває! Використовуйте стрілки або WASD для керування';
      case 'paused':
        return 'Гра призупинена';
      case 'gameOver':
        return 'Кінець гри! Натисни "Нова гра" для перезапуску';
      default:
        return '';
    }
  };

  const getActionButton = () => {
    switch (status) {
      case 'ready':
        return (
          <button 
            style={buttonStyle} 
            onClick={onStartGame}
            onMouseOver={(e) => (e.target as HTMLButtonElement).style.opacity = '0.8'}
            onMouseOut={(e) => (e.target as HTMLButtonElement).style.opacity = '1'}
          >
            Почати гру
          </button>
        );
      case 'playing':
        return (
          <button 
            style={buttonStyle} 
            onClick={onPauseGame}
            onMouseOver={(e) => (e.target as HTMLButtonElement).style.opacity = '0.8'}
            onMouseOut={(e) => (e.target as HTMLButtonElement).style.opacity = '1'}
          >
            Пауза
          </button>
        );
      case 'paused':
        return (
          <button 
            style={buttonStyle} 
            onClick={onResumeGame}
            onMouseOver={(e) => (e.target as HTMLButtonElement).style.opacity = '0.8'}
            onMouseOut={(e) => (e.target as HTMLButtonElement).style.opacity = '1'}
          >
            Продовжити
          </button>
        );
      case 'gameOver':
        return (
          <button 
            style={buttonStyle} 
            onClick={onResetGame}
            onMouseOver={(e) => (e.target as HTMLButtonElement).style.opacity = '0.8'}
            onMouseOut={(e) => (e.target as HTMLButtonElement).style.opacity = '1'}
          >
            Нова гра
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div style={containerStyle}>
      <div style={scoreStyle}>Рахунок: {score}</div>
      <div style={statusMessageStyle}>{getStatusMessage()}</div>
      {getActionButton()}
      <div style={{ fontSize: '14px', textAlign: 'center', opacity: 0.7 }}>
        Керування: ← ↑ ↓ → або W A S D<br />
        Пробіл: початок/пауза
      </div>
    </div>
  );
});