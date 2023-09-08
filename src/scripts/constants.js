export const control = {
  UP: 'up',
  LEFT: 'left',
  DOWN: 'down',
  RIGHT: 'right',
  ACTION: 'action',
  PAUSE: 'pause'
}

export const direction = {
  UP: 'up-direction',
  LEFT: 'left-direction',
  DOWN: 'down-direction',
  RIGHT: 'right-direction'
}

export const cornerDirections = {
  [direction.UP]: [direction.RIGHT, direction.LEFT],
  [direction.LEFT]: [direction.DOWN, direction.UP],
  [direction.DOWN]: [direction.RIGHT, direction.LEFT],
  [direction.RIGHT]: [direction.DOWN, direction.UP]
}

export const movementOrientation = {
  [direction.UP]: { x: 0, y: -1 },
  [direction.LEFT]: { x: -1, y: 0 },
  [direction.DOWN]: { x: 0, y: 1 },
  [direction.RIGHT]: { x: 1, y: 0 }
}

export const tile = {
  WALL: 10,
  FLOOR: 11
}

export const collisionTile = {
  EMPTY: 104,
  BARRIER: {
    WALL: 101,
    BLOCK: 102,
    BOMB: 103
  }
}

export const BOMB_TIMER = 3 * 1000

export const TILE_SIZE = 16
export const HALF_TILE_SIZE = TILE_SIZE / 2
export const SCREEN_WIDTH = 17 * TILE_SIZE
export const SCREEN_HEIGHT = 15 * TILE_SIZE

export const CANVAS_ID = 'canvas'

export const DEBUG = true
