export const CANVAS_ID = 'canvas'

export const Sprite = {
  'PLAYER': document.querySelector('img#mario'),
  'BOMB': document.querySelector('img#bomb'),
  'TILES': document.querySelector('img#tiles'),
  'HUD': document.querySelector('img#hud'),
  'PAUSE_SCREEN': document.querySelector('img#pause-screen'),
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

export const PAUSE_SCREEN_WIDTH = Math.floor(SCREEN_WIDTH * .85)
export const PAUSE_SCREEN_HEIGHT = Math.floor(SCREEN_HEIGHT * .4)

export const FRAME_TIME = 1000 / 60

// Coordenadas y dimensiones para dibujar la pantalla de pausa.

const PAUSE_SCREEN_PADDING = 12
const PauseScreenGaps = [20, 8]

// X de origen, Y de origen, ancho y alto.
export const PauseTItleDimensions = [0, 49, 48, 8]
export const PauseTitleCoords = [
  Math.floor((PAUSE_SCREEN_WIDTH - PauseTItleDimensions[2]) / 2),
  PAUSE_SCREEN_PADDING
]
export const ControlsTitleDimensions = [0, 57, 64, 8]
export const ControlsTitleCoords = [
  Math.floor((PAUSE_SCREEN_WIDTH - ControlsTitleDimensions[2]) / 2),
  PauseTitleCoords[1] + PauseTItleDimensions[3] + PauseScreenGaps[0]
]
export const ControlsMovementDimensions = [0, 0, 112, 44]
export const ControlsMovementCoords = [
  PAUSE_SCREEN_PADDING,
  PAUSE_SCREEN_HEIGHT - ControlsMovementDimensions[3] - PAUSE_SCREEN_PADDING
]
export const ControlsActionsDimensions = [64, 44, 79, 21]
export const ControlsActionsCoords = [
  PAUSE_SCREEN_WIDTH - ControlsActionsDimensions[2] - PAUSE_SCREEN_PADDING,
  Math.floor(ControlsMovementCoords[1] + (ControlsMovementDimensions[3] - ControlsActionsDimensions[3]) / 2)
]
