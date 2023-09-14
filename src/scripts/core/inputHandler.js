import { Control } from '../constants/playermovement.js';
import { PlayerControl } from '../constants/playermovement.js';

const playerKeys = Object.values(PlayerControl).flat()
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


export const isUp = key => PlayerControl[Control.UP] === key
export const isLeft = key => PlayerControl[Control.LEFT] === key
export const isDown = key => PlayerControl[Control.DOWN] === key
export const isRight = key => PlayerControl[Control.RIGHT] === key
export const isAction = key => PlayerControl[Control.ACTION] === key

// export const noControlDown = () => heldKeys.size === 0
export const getLastControlDown = () => [...heldKeys][heldKeys.size - 1]
