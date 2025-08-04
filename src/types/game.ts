export interface Position {
  x: number;
  y: number;
}

export interface Snake {
  body: Position[];
  direction: Direction;
}

export interface Food {
  position: Position;
}

export interface GameState {
  snake: Snake;
  food: Food;
  score: number;
  status: GameStatus;
  gridSize: {
    width: number;
    height: number;
  };
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export type GameStatus = 'ready' | 'playing' | 'paused' | 'gameOver';

export interface GameAction {
  type: GameActionType;
  payload?: Partial<GameState> | Direction;
}

export enum GameActionType {
  START_GAME = 'START_GAME',
  PAUSE_GAME = 'PAUSE_GAME',
  RESUME_GAME = 'RESUME_GAME',
  GAME_OVER = 'GAME_OVER',
  RESET_GAME = 'RESET_GAME',
  CHANGE_DIRECTION = 'CHANGE_DIRECTION',
  MOVE_SNAKE = 'MOVE_SNAKE',
  EAT_FOOD = 'EAT_FOOD'
}