import { tile } from './constants.js'

const W = tile.WALL
const F = tile.FLOOR

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
  ]
]
