import { control } from '../constants.js';
import { player_controls } from '../controls.js';

const playerKeys = Object.values(player_controls).flat()
const heldKeys = new Set()

function handleKeyDown(e) {
  if (!playerKeys.includes(e.code)) return

  e.preventDefault();
  heldKeys.add(e.code)
}

function handleKeyUp(e) {
  if (!playerKeys.includes(e.code)) return

  e.preventDefault()
  heldKeys.delete(e.code)
}

function handleVisibilityChange() {
  if (window.visibilityState !== 'visible') heldKeys.clear()
}

export function addKeyEventsListeners() {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)

  window.addEventListener('visibilitychange', handleVisibilityChange)
}


export const isUp = key => player_controls[control.UP] === key
export const isLeft = key => player_controls[control.LEFT] === key
export const isDown = key => player_controls[control.DOWN] === key
export const isRight = key => player_controls[control.RIGHT] === key
export const isAction = key => player_controls[control.ACTION] === key

// export const noControlDown = () => heldKeys.size === 0
export const getLastControlDown = () => [...heldKeys][heldKeys.size - 1]
