import { BOMB_TIMER, BombAnimation } from '../constants/bomb.js'
import { FRAME_TIME, HALF_TILE_SIZE, Sprite, TILE_SIZE } from '../constants/game.js'

import Entity from './Entity.js'

class Bomb extends Entity {
  image = Sprite.BOMB
  animation = BombAnimation

  constructor(position, time, onBombEnd) {
    super({
      x: position.col * TILE_SIZE + HALF_TILE_SIZE,
      y: position.row * TILE_SIZE + HALF_TILE_SIZE
    })

    this.cell = position

    this.timer = time.previous + BOMB_TIMER
    this.onBombEnd = onBombEnd

    this.animationTimer = time.previous + this.animation[this.animationFrame].timer * FRAME_TIME
  }

  updateAnimation(time) {
    if (time.previous < this.animationTimer) return

    this.animationFrame += 1
    if (this.animationFrame >= this.animation.length) this.animationFrame = 0

    this.animationTimer = time.previous + this.animation[this.animationFrame].timer * FRAME_TIME
  }

  updateTimer(time) {
    if (time.previous >= this.timer) this.onBombEnd(this)
  }

  update(time) {
    this.updateAnimation(time)
    this.updateTimer(time)
  }

  draw(ctx) {
    const { originX, originY, width, height } = this.animation[this.animationFrame]

    ctx.drawImage(
      this.image,
      originX, originY,
      width, height,
      this.position.x - HALF_TILE_SIZE + (TILE_SIZE - width) / 2,
      this.position.y - HALF_TILE_SIZE + (TILE_SIZE - height) / 2,
      width, height
    )
  }
}

export default Bomb
