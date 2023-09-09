import { BOMB_TIMER, HALF_TILE_SIZE, TILE_SIZE } from '../constants.js'
import Entity from './Entity.js'

class Bomb extends Entity {
  constructor(position, time, onBombEnd) {
    super({
      x: position.col * TILE_SIZE + HALF_TILE_SIZE,
      y: position.row * TILE_SIZE + HALF_TILE_SIZE
    })

    this.cell = position

    this.width = 16
    this.height = 16

    this.timer = time.previous + BOMB_TIMER
    this.onBombEnd = onBombEnd
  }

  updateTimer(time) {
    if (time.previous >= this.timer) this.onBombEnd(this)
  }

  draw(ctx) {
    ctx.fillStyle = 'red'

    ctx.fillRect(
      this.position.x - HALF_TILE_SIZE,
      this.position.y - HALF_TILE_SIZE,
      this.width,
      this.height
    )
  }

  update(time) { this.updateTimer(time) }

}

export default Bomb
