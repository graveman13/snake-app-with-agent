import { GameState, GameAction, GameActionType, Direction } from '../types/game';
import { GAME_CONFIG } from '../config/gameConfig';
import {
  createInitialSnake,
  generateRandomFood,
  moveSnake,
  growSnake,
  checkWallCollision,
  checkSelfCollision,
  checkFoodCollision,
  getNextHeadPosition,
  isOppositeDirection
} from '../utils/gameLogic';

export const createInitialGameState = (): GameState => {
  const initialSnake = createInitialSnake(GAME_CONFIG.INITIAL_POSITION);
  
  return {
    snake: initialSnake,
    food: generateRandomFood(initialSnake.body),
    score: 0,
    status: 'ready',
    gridSize: {
      width: GAME_CONFIG.GRID_SIZE.WIDTH,
      height: GAME_CONFIG.GRID_SIZE.HEIGHT
    }
  };
};

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case GameActionType.START_GAME:
      return {
        ...state,
        status: 'playing'
      };

    case GameActionType.PAUSE_GAME:
      return {
        ...state,
        status: 'paused'
      };

    case GameActionType.RESUME_GAME:
      return {
        ...state,
        status: 'playing'
      };

    case GameActionType.GAME_OVER:
      return {
        ...state,
        status: 'gameOver'
      };

    case GameActionType.RESET_GAME:
      return createInitialGameState();

    case GameActionType.CHANGE_DIRECTION:
      if (action.payload && typeof action.payload === 'string') {
        const newDirection = action.payload as Direction;
        
        if (isOppositeDirection(state.snake.direction, newDirection)) {
          return state;
        }
        
        return {
          ...state,
          snake: {
            ...state.snake,
            direction: newDirection
          }
        };
      }
      return state;

    case GameActionType.MOVE_SNAKE:
      if (state.status !== 'playing') {
        return state;
      }

      const head = state.snake.body[0];
      const nextHead = getNextHeadPosition(head, state.snake.direction);

      // Перевірка колізій зі стінами
      if (checkWallCollision(nextHead)) {
        return {
          ...state,
          status: 'gameOver'
        };
      }

      // Перевірка колізій з тілом змійки (без голови)
      if (checkSelfCollision(nextHead, state.snake.body.slice(1))) {
        return {
          ...state,
          status: 'gameOver'
        };
      }

      // Перевірка поїдання їжі
      if (checkFoodCollision(nextHead, state.food)) {
        const newSnake = growSnake(state.snake);
        
        return {
          ...state,
          snake: newSnake,
          food: generateRandomFood(newSnake.body),
          score: state.score + 10
        };
      }

      // Звичайний рух
      return {
        ...state,
        snake: moveSnake(state.snake)
      };

    default:
      return state;
  }
};