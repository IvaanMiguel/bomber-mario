import { Tile } from './game.js'

const W = Tile.WALL
const F = Tile.FLOOR

export default [
  [
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
  ],
  [
    [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
    [W, F, F, F, F, F, F, F, W, F, F, F, F, F, F, F, W],
    [W, F, W, F, W, W, W, F, W, F, W, W, W, F, W, F, W],
    [W, F, W, F, F, F, F, F, F, F, F, F, F, F, W, F, W],
    [W, F, W, F, W, F, W, F, W, F, W, F, W, F, W, F, W],
    [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
    [W, F, W, F, W, F, W, F, W, F, W, F, W, F, W, F, W],
    [W, F, F, F, F, F, F, F, W, F, F, F, F, F, F, F, W],
    [W, F, W, F, W, F, W, F, W, F, W, F, W, F, W, F, W],
    [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
    [W, F, W, F, W, F, W, F, W, F, W, F, W, F, W, F, W],
    [W, F, W, F, F, F, F, F, F, F, F, F, F, F, W, F, W],
    [W, F, W, F, W, W, W, F, W, F, W, W, W, F, W, F, W],
    [W, F, F, F, F, F, F, F, W, F, F, F, F, F, F, F, W],
    [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W]
  ],
  [
    [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
    [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
    [W, F, W, F, W, F, W, F, W, F, W, F, W, F, W, F, W],
    [W, F, F, F, W, F, F, F, W, F, F, F, W, F, F, F, W],
    [W, F, W, F, W, F, W, F, W, F, W, F, W, F, W, F, W],
    [W, F, F, F, F, F, F, F, W, F, F, F, F, F, F, F, W],
    [W, F, W, W, W, W, W, F, W, F, W, W, W, W, W, F, W],
    [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
    [W, F, W, W, W, W, W, F, W, F, W, W, W, W, W, F, W],
    [W, F, F, F, F, F, F, F, W, F, F, F, F, F, F, F, W],
    [W, F, W, F, W, F, W, F, W, F, W, F, W, F, W, F, W],
    [W, F, F, F, W, F, F, F, W, F, F, F, W, F, F, F, W],
    [W, F, W, F, W, F, W, F, W, F, W, F, W, F, W, F, W],
    [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
    [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W]
  ],
  [
    [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
    [W, F, F, F, W, F, F, F, W, F, F, F, W, F, F, F, W],
    [W, F, W, F, F, F, W, F, F, F, W, F, F, F, W, F, W],
    [W, F, F, F, W, F, F, F, W, F, F, F, W, F, F, F, W],
    [W, F, W, F, F, F, W, F, F, F, W, F, F, F, W, F, W],
    [W, F, F, F, W, F, F, F, W, F, F, F, W, F, F, F, W],
    [W, F, W, F, F, F, W, F, F, F, W, F, F, F, W, F, W],
    [W, F, F, F, W, F, F, F, W, F, F, F, W, F, F, F, W],
    [W, F, W, F, F, F, W, F, F, F, W, F, F, F, W, F, W],
    [W, F, F, F, W, F, F, F, W, F, F, F, W, F, F, F, W],
    [W, F, W, F, F, F, W, F, F, F, W, F, F, F, W, F, W],
    [W, F, F, F, W, F, F, F, W, F, F, F, W, F, F, F, W],
    [W, F, W, F, F, F, W, F, F, F, W, F, F, F, W, F, W],
    [W, F, F, F, W, F, F, F, W, F, F, F, W, F, F, F, W],
    [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W]
  ],
  [
    [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
    [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
    [W, F, W, F, W, F, W, F, W, F, W, F, W, F, W, F, W],
    [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
    [W, F, W, F, W, F, W, W, W, W, W, F, W, F, W, F, W],
    [W, F, F, F, F, F, W, F, F, F, W, F, F, F, F, F, W],
    [W, F, W, W, W, W, W, F, F, F, W, W, W, W, W, F, W],
    [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
    [W, F, W, W, W, W, W, F, F, F, W, W, W, W, W, F, W],
    [W, F, F, F, F, F, W, F, F, F, W, F, F, F, F, F, W],
    [W, F, W, F, W, F, W, W, W, W, W, F, W, F, W, F, W],
    [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
    [W, F, W, F, W, F, W, F, W, F, W, F, W, F, W, F, W],
    [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
    [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W]
  ],
  [
    [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
    [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
    [W, F, F, F, F, F, F, W, F, W, F, F, F, F, F, F, W],
    [W, F, F, F, F, W, W, F, F, F, W, W, F, F, F, F, W],
    [W, F, W, F, W, F, F, F, F, F, F, F, W, F, W, F, W],
    [W, F, F, W, F, F, F, W, W, F, F, F, F, W, F, F, W],
    [W, F, F, W, F, F, F, F, F, W, F, F, F, W, F, F, W],
    [W, F, W, F, F, F, F, W, W, F, F, F, F, F, W, F, W],
    [W, F, F, W, F, F, F, F, F, W, F, F, F, W, F, F, W],
    [W, F, W, F, F, F, F, W, W, F, F, F, F, F, W, F, W],
    [W, F, F, W, F, F, F, F, F, F, F, F, F, W, F, F, W],
    [W, F, F, F, W, F, F, W, W, W, F, F, W, F, F, F, W],
    [W, F, F, W, F, W, W, F, W, F, W, W, F, W, F, F, W],
    [W, F, F, F, F, F, F, F, W, F, F, F, F, F, F, F, W],
    [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W]
  ]
]

/* Para crear mapas más fácilmente.
[
  [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
  [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
  [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
  [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
  [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
  [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
  [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
  [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
  [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
  [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
  [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
  [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
  [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
  [W, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, W],
  [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W]
]
*/