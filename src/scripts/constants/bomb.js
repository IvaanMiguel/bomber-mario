export const BOMB_TIMER = 2 * 1000
export const EXPLOSION_TIMER = .5 * 1000
export const FlameDirection = [[0, -1], [-1, 0], [0, 1], [1, 0]]

const BombFrame = {
  IDLE_1: 'idle-1',
  IDLE_2: 'idle-2'
}

export const BombKeyFrame = {
  [BombFrame.IDLE_1]: { originX: 0, originY: 0, width: 16, height: 14, timer: 22 },
  [BombFrame.IDLE_2]: { originX: 16, originY: 0, width: 16, height: 14, timer: 22 },
}

export const BombAnimation = [BombKeyFrame[BombFrame.IDLE_1], BombKeyFrame[BombFrame.IDLE_2]]
