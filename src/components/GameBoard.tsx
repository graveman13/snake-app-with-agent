import React from 'react';
import { GameCell } from './GameCell';
import type { GameState, Position } from '../types/game';
import { COLORS, GAME_CONFIG } from '../config/gameConfig';

interface GameBoardProps {
  gameState: GameState;
}

export const GameBoard: React.FC<GameBoardProps> = React.memo(({ gameState }) => {
  const { snake, food, gridSize } = gameState;

  const isSnakeHead = (position: Position): boolean => {
    const head = snake.body[0];
    return head.x === position.x && head.y === position.y;
  };

  const isSnakeBody = (position: Position): boolean => {
    return snake.body.slice(1).some(segment => 
      segment.x === position.x && segment.y === position.y
    );
  };

  const isFood = (position: Position): boolean => {
    return food.position.x === position.x && food.position.y === position.y;
  };

  const boardStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridSize.width}, ${GAME_CONFIG.CELL_SIZE}px)`,
    gridTemplateRows: `repeat(${gridSize.height}, ${GAME_CONFIG.CELL_SIZE}px)`,
    gap: '0',
    backgroundColor: COLORS.BACKGROUND,
    border: `2px solid ${COLORS.GRID_LINE}`,
    margin: '0 auto'
  };

  const renderCells = () => {
    const cells = [];
    
    for (let y = 0; y < gridSize.height; y++) {
      for (let x = 0; x < gridSize.width; x++) {
        const position = { x, y };
        const key = `${x}-${y}`;
        
        cells.push(
          <GameCell
            key={key}
            position={position}
            isSnakeHead={isSnakeHead(position)}
            isSnakeBody={isSnakeBody(position)}
            isFood={isFood(position)}
          />
        );
      }
    }
    
    return cells;
  };

  return <div style={boardStyle}>{renderCells()}</div>;
});