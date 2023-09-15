import { Control } from '../constants/playermovement.js';
import { PlayerControl } from '../constants/playermovement.js';

const playerKeys = Object.values(PlayerControl).flat()
const heldKeys = new Set()
const pressedKeys = new Set();

function handleKeyDown(e) {
  if (!playerKeys.includes(e.code)) return

  e.preventDefault();
  heldKeys.add(e.code)
}

function handleKeyUp(e) {
  if (!playerKeys.includes(e.code)) return

  e.preventDefault()
  heldKeys.delete(e.code)
  pressedKeys.delete(e.code);
}

function handleVisibilityChange() {
  if (window.visibilityState !== 'visible') heldKeys.clear()
}

export function addKeyEventsListeners() {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)

  window.addEventListener('visibilitychange', handleVisibilityChange)
}

const getLastControlDown = () => [...heldKeys][heldKeys.size - 1]

export function isKeyHeld(control) {
  return PlayerControl[control] === getLastControlDown()
}

export function isKeyPressed(key) {
	if (heldKeys.has(PlayerControl[key]) && !pressedKeys.has(PlayerControl[key])) {
		pressedKeys.add(PlayerControl[key]);
		return true;
	}

	return false;
}
