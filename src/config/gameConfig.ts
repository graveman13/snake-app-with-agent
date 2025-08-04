export const GAME_CONFIG = {
  GRID_SIZE: {
    WIDTH: 20,
    HEIGHT: 20
  },
  CELL_SIZE: 20,
  INITIAL_SPEED: 150,
  INITIAL_SNAKE_LENGTH: 3,
  INITIAL_POSITION: {
    x: 10,
    y: 10
  }
} as const;

export const COLORS = {
  SNAKE_HEAD: '#4ade80',
  SNAKE_BODY: '#22c55e',
  FOOD: '#ef4444',
  GRID_LINE: '#374151',
  BACKGROUND: '#111827',
  TEXT: '#f9fafb'
} as const;

export const KEY_MAPPINGS = {
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
  KeyW: 'UP',
  KeyS: 'DOWN',
  KeyA: 'LEFT',
  KeyD: 'RIGHT'
} as const;