export const Control = {
  UP: 'up',
  LEFT: 'left',
  DOWN: 'down',
  RIGHT: 'right',
  ACTION: 'action',
  PAUSE: 'pause'
}

export const Direction = {
  UP: 'up-direction',
  LEFT: 'left-direction',
  DOWN: 'down-direction',
  RIGHT: 'right-direction'
}

export const CornerDirection = {
  [Direction.UP]: [Direction.RIGHT, Direction.LEFT],
  [Direction.LEFT]: [Direction.DOWN, Direction.UP],
  [Direction.DOWN]: [Direction.RIGHT, Direction.LEFT],
  [Direction.RIGHT]: [Direction.DOWN, Direction.UP]
}

export const MovementOrientation = {
  [Direction.UP]: { x: 0, y: -1 },
  [Direction.LEFT]: { x: -1, y: 0 },
  [Direction.DOWN]: { x: 0, y: 1 },
  [Direction.RIGHT]: { x: 1, y: 0 }
}

export const WALK_SPEED = 60

export const FlameDirection = [[0, -1], [-1, 0], [0, 1], [1, 0]]

export const Tile = {
  BLOCK: 0,
  WALL: 1,
  FLOOR: 6,
  GOAL: 13
}

export const CollisionTile = {
  EMPTY: 104,
  BARRIER: {
    WALL: 101,
    BLOCK: 102,
    BOMB: 103
  },
  FLAME: 105
}

export const PlayerState = {
  IDLE: 'idle',
  MOVING: 'moving',
  // DROPPING_BOMB: 'droppingBomb',
  DEATH: 'death'
}

export const PlayerFrame = {
  IDLE_LEFT: 'idle-left',
  MOVING_LEFT: 'moving-left',
  IDLE_RIGHT: 'idle-right',
  MOVING_RIGHT: 'moving-right'
}

export const PlayerKeyframe = {
  [PlayerFrame.IDLE_RIGHT]: { originX: 0, originY: 0, width: 12, height: 16, timer: 8 },
  [PlayerFrame.MOVING_RIGHT]: { originX: 12, originY: 0, width: 14, height: 16, timer: 8 },
  [PlayerFrame.IDLE_LEFT]: { originX: 26, originY: 0, width: 12, height: 16, timer: 8 },
  [PlayerFrame.MOVING_LEFT]: { originX: 38, originY: 0, width: 14, height: 16, timer: 8 },
}

export const PlayerAnimation = {
  [Direction.RIGHT]: [PlayerKeyframe[PlayerFrame.IDLE_RIGHT], PlayerKeyframe[PlayerFrame.MOVING_RIGHT]],
  [Direction.LEFT]: [PlayerKeyframe[PlayerFrame.IDLE_LEFT], PlayerKeyframe[PlayerFrame.MOVING_LEFT]],
}

export const tileCollisionMapping = {
  [Tile.WALL]: CollisionTile.BARRIER.WALL,
  [Tile.FLOOR]: CollisionTile.EMPTY,
  [Tile.BLOCK]: CollisionTile.BARRIER.BLOCK
}

export const BACKGROUND_COLOR = 'black'

export const StartTile = [[1, 1], [1, 2], [2, 1]]

export const BOMB_TIMER = 2 * 1000
export const EXPLOSION_TIMER = .5 * 1000

export const MAX_TOTAL_BLOCKS = 50

export const TILE_SIZE = 16
export const HALF_TILE_SIZE = TILE_SIZE / 2

export const SCREEN_WIDTH = 17 * TILE_SIZE
export const SCREEN_HEIGHT = 15 * TILE_SIZE

export const FRAME_TIME = 1000 / 60

export const CANVAS_ID = 'canvas'

export const DEBUG = true
