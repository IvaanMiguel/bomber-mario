import {
  PAUSE_BG_COLOR,
  PAUSE_SCREEN_HEIGHT,
  PAUSE_SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH
} from '../constants/game.js';
import { Control } from '../constants/playermovement.js';
import { isKeyPressed } from '../core/inputHandler.js';
import Entity from '../entities/Entity.js';

class Pause extends Entity {
  timeOnScreen = 0
  initialTime = 0

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
  }

  handlePause(time) {
    if (isKeyPressed(Control.PAUSE)) this.isActive = !this.isActive

    if (!this.isActive) return
    this.initialTime = time.previous
    this.wasPaused = true
  }

  createScreen() {
    this.ctx.fillStyle = PAUSE_BG_COLOR
    this.ctx.fillRect(0, 0, this.width, this.height)
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
