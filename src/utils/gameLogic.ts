import { Position, Snake, Food, Direction } from '../types/game';
import { GAME_CONFIG } from '../config/gameConfig';

export const createInitialSnake = (startPosition: Position): Snake => ({
  body: [
    startPosition,
    { x: startPosition.x - 1, y: startPosition.y },
    { x: startPosition.x - 2, y: startPosition.y }
  ],
  direction: Direction.RIGHT
});

export const generateRandomFood = (snakeBody: Position[]): Food => {
  const { WIDTH, HEIGHT } = GAME_CONFIG.GRID_SIZE;
  let newPosition: Position;

  do {
    newPosition = {
      x: Math.floor(Math.random() * WIDTH),
      y: Math.floor(Math.random() * HEIGHT)
    };
  } while (isPositionOnSnake(newPosition, snakeBody));

  return { position: newPosition };
};

export const isPositionOnSnake = (position: Position, snakeBody: Position[]): boolean => {
  return snakeBody.some(segment =>
    segment.x === position.x && segment.y === position.y
  );
};

export const getNextHeadPosition = (head: Position, direction: Direction): Position => {
  switch (direction) {
    case Direction.UP:
      return { x: head.x, y: head.y - 1 };
    case Direction.DOWN:
      return { x: head.x, y: head.y + 1 };
    case Direction.LEFT:
      return { x: head.x - 1, y: head.y };
    case Direction.RIGHT:
      return { x: head.x + 1, y: head.y };
    default:
      return head;
  }
};

export const checkWallCollision = (position: Position): boolean => {
  const { WIDTH, HEIGHT } = GAME_CONFIG.GRID_SIZE;
  return position.x < 0 || position.x >= WIDTH || position.y < 0 || position.y >= HEIGHT;
};

export const checkSelfCollision = (head: Position, bodyWithoutHead: Position[]): boolean => {
  return bodyWithoutHead.some(segment => segment.x === head.x && segment.y === head.y);
};

export const checkFoodCollision = (head: Position, food: Food): boolean => {
  return head.x === food.position.x && head.y === food.position.y;
};

export const isOppositeDirection = (current: Direction, next: Direction): boolean => {
  const opposites = {
    [Direction.UP]: Direction.DOWN,
    [Direction.DOWN]: Direction.UP,
    [Direction.LEFT]: Direction.RIGHT,
    [Direction.RIGHT]: Direction.LEFT
  };

  return opposites[current] === next;
};

export const moveSnake = (snake: Snake): Snake => {
  const head = snake.body[0];
  const newHead = getNextHeadPosition(head, snake.direction);

  return {
    ...snake,
    body: [newHead, ...snake.body.slice(0, -1)]
  };
};

export const growSnake = (snake: Snake): Snake => {
  const head = snake.body[0];
  const newHead = getNextHeadPosition(head, snake.direction);

  return {
    ...snake,
    body: [newHead, ...snake.body]
  };
};