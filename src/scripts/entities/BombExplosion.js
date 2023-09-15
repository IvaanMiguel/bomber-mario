import {
  BOTTOM_LAST_FRAME_1,
  CenterExplosionAnimation,
  EXPLOSION_FRAME_DELAY,
  FlameAnimation,
  HORIZONTAL_FRAME_1,
  LEFT_LAST_FRAME_1,
  RIGHT_LAST_FRAME_1,
  UP_LAST_FRAME_1,
  VERTICAL_FRAME_1
} from '../constants/bomb.js'
import {
  FRAME_TIME,
  OFFSET_Y,
  Sprite,
  TILE_SIZE
} from '../constants/game.js'
import Entity from './Entity.js'
import { getSpriteOrigins } from './utils.js'

// Clase usada únicamente para manejar el dibujado de la explosión de las bombas.
class BombExplosion extends Entity {
  image = Sprite.BOMB

  constructor(cell, flameCells, onExplosionEnd, time) {
    super({
      x: cell.col * TILE_SIZE,
      y: cell.row * TILE_SIZE
    })

    this.cell = cell
    this.flameCells = flameCells,
    this.onExplosionEnd = onExplosionEnd

    this.animationTimer = time.previous + EXPLOSION_FRAME_DELAY * FRAME_TIME
  }

  getFirstFrameAnimation(flameCell) {
    if (!flameCell.isLast && flameCell.isVertical) {
      return VERTICAL_FRAME_1
    }
    if (!flameCell.isLast && !flameCell.isVertical) {
      return HORIZONTAL_FRAME_1
    }
    if (flameCell.isLast && !flameCell.isVertical) {
      return flameCell.cell.col < this.cell.col ? LEFT_LAST_FRAME_1 : RIGHT_LAST_FRAME_1
    }
    if (flameCell.isLast && flameCell.isVertical) {
      return flameCell.cell.row < this.cell.row ? UP_LAST_FRAME_1 : BOTTOM_LAST_FRAME_1
    }
  }

  updateAnimation(time) {
    if (time.previous < this.animationTimer) return

    this.animationFrame += 1
    this.animationTimer = time.previous + EXPLOSION_FRAME_DELAY * FRAME_TIME

    if (this.animationFrame < CenterExplosionAnimation.length) return

    this.animationFrame = 0
    this.onExplosionEnd(this)
  }

  update(time) {
    this.updateAnimation(time)
  }

  draw(ctx) {
    const { originX, originY } = getSpriteOrigins(this.image, CenterExplosionAnimation[this.animationFrame])

    ctx.drawImage(
      this.image,
      originX, originY,
      TILE_SIZE, TILE_SIZE,
      this.position.x, this.position.y + OFFSET_Y,
      TILE_SIZE, TILE_SIZE
    )

    if (this.animationFrame === FlameAnimation.length) return

    this.flameCells.forEach(flameCell => {
      const firstFrameAnimation = this.getFirstFrameAnimation(flameCell)
      const { originX, originY } = getSpriteOrigins(this.image, firstFrameAnimation + FlameAnimation[this.animationFrame])

      ctx.drawImage(
        this.image,
        originX, originY,
        TILE_SIZE, TILE_SIZE,
        flameCell.cell.col * TILE_SIZE,
        flameCell.cell.row * TILE_SIZE + OFFSET_Y,
        TILE_SIZE, TILE_SIZE
      )
    })
  }
}

export default BombExplosion
