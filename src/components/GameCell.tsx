import React from 'react';
import type { Position } from '../types/game';
import { COLORS, GAME_CONFIG } from '../config/gameConfig';

interface GameCellProps {
  position: Position;
  isSnakeHead: boolean;
  isSnakeBody: boolean;
  isFood: boolean;
}

export const GameCell: React.FC<GameCellProps> = React.memo(({ 
  isSnakeHead, 
  isSnakeBody, 
  isFood 
}) => {
  const getCellStyle = (): React.CSSProperties => {
    let backgroundColor = 'transparent';
    
    if (isSnakeHead) {
      backgroundColor = COLORS.SNAKE_HEAD;
    } else if (isSnakeBody) {
      backgroundColor = COLORS.SNAKE_BODY;
    } else if (isFood) {
      backgroundColor = COLORS.FOOD;
    }
    
    return {
      width: `${GAME_CONFIG.CELL_SIZE}px`,
      height: `${GAME_CONFIG.CELL_SIZE}px`,
      backgroundColor,
      border: `1px solid ${COLORS.GRID_LINE}`,
      boxSizing: 'border-box'
    };
  };

  return <div style={getCellStyle()} />;
});