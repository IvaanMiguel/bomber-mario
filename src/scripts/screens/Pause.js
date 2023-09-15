import { Sound } from '../constants/audio.js';
import {
  ControlsActionsCoords,
  ControlsActionsDimensions,
  ControlsMovementCoords,
  ControlsMovementDimensions,
  ControlsTitleCoords,
  ControlsTitleDimensions,
  PAUSE_BG_COLOR,
  PAUSE_SCREEN_HEIGHT,
  PAUSE_SCREEN_WIDTH,
  PauseTItleDimensions,
  PauseTitleCoords,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  Sprite
} from '../constants/game.js';
import { Control } from '../constants/playermovement.js';
import { isKeyPressed } from '../core/inputHandler.js';
import { playSound, stopSound } from '../core/soundHandler.js';
import Entity from '../entities/Entity.js';

class Pause extends Entity {
  image = Sprite.PAUSE_SCREEN
  timeOnScreen = 0
  initialTime = 0
  pauseSound = Sound.pause

  constructor() {
    super({
      x: Math.floor((SCREEN_WIDTH - PAUSE_SCREEN_WIDTH) / 2),
      y: Math.floor((SCREEN_HEIGHT - PAUSE_SCREEN_HEIGHT) / 2)
    })

    this.width = PAUSE_SCREEN_WIDTH,
    this.height = PAUSE_SCREEN_HEIGHT

    this.isActive = false
    this.wasPaused = false

    this.screen = new OffscreenCanvas(this.width, this.height)
    this.ctx = this.screen.getContext('2d')

    this.createScreen()
  }

  updateTimeOnScreen(timestamp) {
    if (!this.wasPaused) return

    this.wasPaused = false
    this.timeOnScreen += (timestamp - this.timeOnScreen) - this.initialTime
    stopSound(this.pauseSound.audio)
  }

  handlePause(time) {
    if (isKeyPressed(Control.PAUSE)) this.isActive = !this.isActive

    if (!this.isActive) return

    playSound(this.pauseSound.audio, {
      volume: this.pauseSound.volume,
      wait: true
    })
    this.initialTime = time.previous
    this.wasPaused = true
  }

  drawScreenSection(dimensions, coords) {
    this.ctx.drawImage(
      this.image,
      dimensions[0], dimensions[1],
      dimensions[2], dimensions[3],
      coords[0], coords[1],
      dimensions[2], dimensions[3]
    )
  }

  createScreen() {
    this.ctx.fillStyle = PAUSE_BG_COLOR
    this.ctx.fillRect(0, 0, this.width, this.height)

    this.drawScreenSection(PauseTItleDimensions, PauseTitleCoords)
    this.drawScreenSection(ControlsTitleDimensions, ControlsTitleCoords)
    this.drawScreenSection(ControlsMovementDimensions, ControlsMovementCoords)
    this.drawScreenSection(ControlsActionsDimensions, ControlsActionsCoords)
  }

  update(time) {
    this.handlePause(time)
  }

  draw(ctx) {
    if (!this.isActive) return
    ctx.drawImage(this.screen, this.position.x, this.position.y)
  }
}

export default Pause
