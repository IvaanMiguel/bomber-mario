export const BOMB_TIMER = 2 * 1000
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

export const EXPLOSION_FRAME_DELAY = 3

/*
 * Estos números representan la "posición" del sprite en la imagen, empezando a contar
 * de izquierda a derecha y desde arriba hacia abajo. Posteriormente se usarán para
 * calcular el frame al que se refieren. Empezando a contar desde 0.
 */
export const HORIZONTAL_FRAME_1 = 28
export const VERTICAL_FRAME_1 = 20
export const RIGHT_LAST_FRAME_1 = 16
export const LEFT_LAST_FRAME_1 = 24
export const UP_LAST_FRAME_1 = 4
export const BOTTOM_LAST_FRAME_1 = 12
export const CenterExplosionAnimation = [2, 8, 9, 10, 11, 10, 9, 8]

/*
 * A cada *_FRAME_1 definido arriba, se le suma cada uno de estos valores para
 * generar una animación cíclica, si tomámos como ejemplo HORIZONTAL_FRAME_1, su animación
 * resultaría como [28, 29, 30, 31, 30, 29, 28], resultando en las posiciones de las imágenes
 * de dicha animación de esa parte de la exposión en específico.
 */
export const FlameAnimation = [0, 1, 2, 3, 2, 1, 0]
