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

export const WALK_SPEED = 60

export const flameDirections = [[0, -1], [-1, 0], [0, 1], [1, 0]]

export const tile = {
  WALL: 10,
  FLOOR: 11,
  BLOCK: 12,
  GOAL: 13
}

export const collisionTile = {
  EMPTY: 104,
  BARRIER: {
    WALL: 101,
    BLOCK: 102,
    BOMB: 103
  },
  FLAME: 105
}

export const tileCollisionMapping = {
  [tile.WALL]: collisionTile.BARRIER.WALL,
  [tile.FLOOR]: collisionTile.EMPTY,
  [tile.BLOCK]: collisionTile.BARRIER.BLOCK
}

export const startTiles = [[1, 1], [1, 2], [2, 1]]

export const BOMB_TIMER = 2 * 1000
export const EXPLOSION_TIMER = .5 * 1000

export const MAX_TOTAL_BLOCKS = 50

export const TILE_SIZE = 16
export const HALF_TILE_SIZE = TILE_SIZE / 2

export const SCREEN_WIDTH = 17 * TILE_SIZE
export const SCREEN_HEIGHT = 15 * TILE_SIZE

export const CANVAS_ID = 'canvas'

export const DEBUG = true
