export const CANVAS_ID = 'canvas'

export const Sprite = {
  'PLAYER': document.querySelector('img#mario'),
  'BOMB': document.querySelector('img#bomb'),
  'TILES': document.querySelector('img#tiles'),
  'HUD': document.querySelector('img#hud')
}

export const Tile = {
  BLOCK: 0,
  WALL: 1,
  FLOOR: 2,
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

export const TileCollisionMapping = {
  [Tile.WALL]: CollisionTile.BARRIER.WALL,
  [Tile.FLOOR]: CollisionTile.EMPTY,
  [Tile.BLOCK]: CollisionTile.BARRIER.BLOCK
}

export const PAUSE_BG_COLOR = 'black'

export const MAX_TOTAL_BLOCKS = 50

export const TILE_SIZE = 16
export const HALF_TILE_SIZE = TILE_SIZE / 2

export const OFFSET_Y = HALF_TILE_SIZE * 3

export const SCREEN_WIDTH = 17 * TILE_SIZE
export const SCREEN_HEIGHT = 15 * TILE_SIZE + OFFSET_Y

export const PAUSE_SCREEN_WIDTH = Math.floor(SCREEN_WIDTH * .75)
export const PAUSE_SCREEN_HEIGHT = Math.floor(SCREEN_HEIGHT * .5)

export const FRAME_TIME = 1000 / 60
