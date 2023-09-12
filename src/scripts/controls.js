import { Control } from './constants.js'

/** Controls uses KeyboardEvent.code property. */
export const player_controls = {
  [Control.UP]: 'KeyW',
  [Control.LEFT]: 'KeyA',
  [Control.DOWN]: 'KeyS',
  [Control.RIGHT]: 'KeyD',
  [Control.ACTION]: 'KeyZ',
  [Control.PAUSE]: 'Space'
}
