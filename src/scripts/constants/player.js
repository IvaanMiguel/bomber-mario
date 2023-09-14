import { Direction } from './playermovement.js'

export const StartTile = [[1, 1], [1, 2], [2, 1]]
export const WALK_SPEED = 60

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
  MOVING_RIGHT: 'moving-right',
  DEATH: 'death'
}

export const PlayerKeyframe = {
  [PlayerFrame.IDLE_RIGHT]: { originX: 0, originY: 0, width: 12, height: 16, timer: 4 },
  [PlayerFrame.MOVING_RIGHT]: { originX: 12, originY: 0, width: 14, height: 16, timer: 4 },
  [PlayerFrame.IDLE_LEFT]: { originX: 26, originY: 0, width: 12, height: 16, timer: 4 },
  [PlayerFrame.MOVING_LEFT]: { originX: 38, originY: 0, width: 14, height: 16, timer: 4 },
  [PlayerFrame.DEATH]: { originX: 52, originY: 0, width: 16, height: 16, timer: 50 }
}

export const PlayerAnimation = {
  MoveAnimation: {
    [Direction.RIGHT]: [PlayerKeyframe[PlayerFrame.IDLE_RIGHT], PlayerKeyframe[PlayerFrame.MOVING_RIGHT]],
    [Direction.LEFT]: [PlayerKeyframe[PlayerFrame.IDLE_LEFT], PlayerKeyframe[PlayerFrame.MOVING_LEFT]],
  },
  DeathAnimation: [PlayerKeyframe[PlayerFrame.DEATH], PlayerKeyframe[PlayerFrame.DEATH]]
}
