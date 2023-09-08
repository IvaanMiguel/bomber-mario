import { tile, collisionTile } from './constants.js'

const W = tile.WALL
const F = tile.FLOOR

const CE = collisionTile.EMPTY
const CW = collisionTile.BARRIER.WALL
const CB = collisionTile.BARRIER.BLOCK

export const tileMap = [
  [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
  [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
  [W, F, W, F, W, F, W, F, W, F, W, F, W, F, W, F, W],
  [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
  [W, F, W, F, W, F, W, F, W, F, W, F, W, F, W, F, W],
  [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
  [W, F, W, F, W, F, W, F, W, F, W, F, W, F, W, F, W],
  [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
  [W, F, W, F, W, F, W, F, W, F, W, F, W, F, W, F, W],
  [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
  [W, F, W, F, W, F, W, F, W, F, W, F, W, F, W, F, W],
  [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
  [W, F, W, F, W, F, W, F, W, F, W, F, W, F, W, F, W],
  [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
  [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W]
]

export const collisionMap = [
  [CW, CW, CW, CW, CW, CW, CW, CW, CW, CW, CW, CW, CW, CW, CW, CW, CW],
  [CW, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CW],
  [CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW],
  [CW, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CW],
  [CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW],
  [CW, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CW],
  [CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW],
  [CW, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CW],
  [CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW],
  [CW, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CW],
  [CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW],
  [CW, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CW],
  [CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW, CE, CW],
  [CW, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CE, CW],
  [CW, CW, CW, CW, CW, CW, CW, CW, CW, CW, CW, CW, CW, CW, CW, CW, CW]
]

