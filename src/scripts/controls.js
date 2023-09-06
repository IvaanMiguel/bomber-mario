import { control } from './constants.js'

/** Controls uses KeyboardEvent.code property. */
export const player_controls = {
  [control.UP]: 'KeyW',
  [control.LEFT]: 'KeyA',
  [control.DOWN]: 'KeyS',
  [control.RIGHT]: 'KeyD',
  [control.ACTION]: 'KeyZ',
  [control.PAUSE]: 'Space'
}
