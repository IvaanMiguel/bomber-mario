import { Sound } from '../constants/audio.js';
import {
  CollisionTile,
  FRAME_TIME,
  OFFSET_Y,
  Sprite,
  TILE_SIZE,
  Tile
} from '../constants/game.js';
import { playSound } from '../core/soundHandler.js';

import Entity from './Entity.js';
import { getSpriteOrigins } from './utils.js';

const FRAME_DELAY = 16
const FIRST_FRAME = 4
const GoalAnimation = [0, 1, 2, 3]

class Goal extends Entity {
  image = Sprite.TILES
  goalReachedSound = Sound.goal
  animation = GoalAnimation

  constructor(levelMap, time) {
    super({ x: 0, y: 0 })

    this.levelMap = levelMap
    this.cell = { row: 0, col: 0 }
    this.isBlocked = true

    this.animationTimer = time.previous + FRAME_DELAY * FRAME_TIME

    this.createGoal()
  }

  createGoal() {
    const index = Math.floor(Math.random() * this.levelMap.blocks.length)

    this.cell = this.levelMap.blocks[index]
    this.levelMap.tileMap[this.cell.row][this.cell.col] = Tile.GOAL
    this.position = {
      x: this.cell.col * TILE_SIZE,
      y: this.cell.row * TILE_SIZE
    }
  }

  resetGoal() {
    playSound(this.goalReachedSound.audio, { volume: this.goalReachedSound.volume })

    this.isBlocked = true
    this.animationFrame = 0
    this.createGoal()
  }

  updateAnimation(time) {
    if (time.previous < this.animationTimer) return

    this.animationFrame += 1    
    if (this.animationFrame >= this.animation.length) this.animationFrame = 0

    this.animationTimer = time.previous + FRAME_DELAY * FRAME_TIME
  }

  update(time) {
    this.isBlocked = this.levelMap.collisionMap[this.cell.row][this.cell.col] === CollisionTile.BARRIER.BLOCK

    if (this.isBlocked) return

    this.updateAnimation(time)
  }

  draw(ctx) {
    if (this.isBlocked) return

    const { originX, originY } = getSpriteOrigins(this.image, FIRST_FRAME + this.animation[this.animationFrame])

    ctx.drawImage(
      this.image,
      originX, originY,
      TILE_SIZE, TILE_SIZE,
      this.position.x, this.position.y + OFFSET_Y,
      TILE_SIZE, TILE_SIZE
    )
  }
}

export default Goal
