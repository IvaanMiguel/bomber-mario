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

export const PlayerControl = {
  [Control.UP]: 'KeyW',
  [Control.LEFT]: 'KeyA',
  [Control.DOWN]: 'KeyS',
  [Control.RIGHT]: 'KeyD',
  [Control.ACTION]: 'KeyZ',
  [Control.PAUSE]: 'Space'
}
