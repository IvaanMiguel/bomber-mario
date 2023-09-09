import { EXPLOSION_TIMER, TILE_SIZE } from '../constants.js'

// Clase usada únicamente para manejar el dibujado de la explosión de las bombas.
class BombExplosion {
  constructor(cell, flameCells, onExplosionEnd, time) {
    this.cell = cell
    this.flameCells = flameCells,
    this.onExplosionEnd = onExplosionEnd
    this.flameTimer = time.previous + EXPLOSION_TIMER
  }

  update(time) {
    if (time.previous >= this.flameTimer) this.onExplosionEnd(this)
  }

  draw(ctx) {
    ctx.fillStyle = 'maroon'
    ctx.fillRect(this.cell.col * TILE_SIZE, this.cell.row * TILE_SIZE, TILE_SIZE, TILE_SIZE)

    this.flameCells.forEach(flameCell => {
      ctx.fillRect(flameCell.col * TILE_SIZE, flameCell.row * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    })
  }
}

export default BombExplosion
