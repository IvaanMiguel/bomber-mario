import {
  HALF_TILE_SIZE,
  OFFSET_Y,
  SCREEN_WIDTH,
  Sprite
} from '../constants/game.js';
import Entity from './Entity.js';
import { getSpriteOrigins } from './utils.js';

const BgInitialTiles = [10, 20, 30]
const CLOCK_INDEX = 13
const COLON_INDEX = 14

class PlayerHud extends Entity {
  image = Sprite.HUD

  constructor() {
    super({ x: 0, y: 0 })

    this.hudImage = new OffscreenCanvas(SCREEN_WIDTH, OFFSET_Y)
    this.ctx = this.hudImage.getContext('2d')

    this.timer = { minutes: 0, seconds: 0 }

    this.buildBackgroundHud()
  }

  drawColumn(tile, tileSize, row, col) {
    const { originX, originY } = getSpriteOrigins(this.image, tile, tileSize)

    this.ctx.drawImage(
      this.image,
      originX, originY,
      tileSize, tileSize,
      col, row * tileSize,
      tileSize, tileSize
    )
  }

  drawCenterRow(centerWidth, row){ 
    const { originX, originY } = getSpriteOrigins(this.image, BgInitialTiles[row] + 1, HALF_TILE_SIZE)

    for (let col = 1; col < centerWidth + 1; col++) {
      this.ctx.drawImage(
        this.image,
        originX, originY,
        HALF_TILE_SIZE, HALF_TILE_SIZE,
        col * HALF_TILE_SIZE, row * HALF_TILE_SIZE,
        HALF_TILE_SIZE, HALF_TILE_SIZE
      )
    }
  }

  buildBackgroundHud() {
    const centerWidth = (SCREEN_WIDTH - HALF_TILE_SIZE * 2) / HALF_TILE_SIZE

    for (let row = 0; row < 3; row++) {
      this.drawColumn(BgInitialTiles[row], HALF_TILE_SIZE, row, 0)
      this.drawCenterRow(centerWidth, row)
      this.drawColumn(BgInitialTiles[row] + 2, HALF_TILE_SIZE, row, SCREEN_WIDTH - HALF_TILE_SIZE)
    }

    const clock = getSpriteOrigins(this.image, CLOCK_INDEX, HALF_TILE_SIZE)
    this.ctx.drawImage(
      this.image,
      clock.originX, clock.originY,
      HALF_TILE_SIZE, HALF_TILE_SIZE,
      HALF_TILE_SIZE, HALF_TILE_SIZE,
      HALF_TILE_SIZE, HALF_TILE_SIZE
    )
  }

  getDigits(clockTime) {
    return [Math.floor(clockTime / 10), clockTime % 10]
  }

  drawTimerDigits(timeOrigins, ctx) {
    timeOrigins.forEach(({ originX, originY }, i) => {
      ctx.drawImage(
      this.image,
      originX, originY,
      HALF_TILE_SIZE, HALF_TILE_SIZE,
      HALF_TILE_SIZE * (2 + i) + i + 1, HALF_TILE_SIZE,
      HALF_TILE_SIZE, HALF_TILE_SIZE
      )
    })
  }

  drawTimer(ctx) {
    const secondsIndexes = this.getDigits(this.timer.seconds)
    const minutesIndexes = this.getDigits(this.timer.minutes)

    const timeOrigins = [
      getSpriteOrigins(this.image, minutesIndexes[0], HALF_TILE_SIZE),
      getSpriteOrigins(this.image, minutesIndexes[1], HALF_TILE_SIZE),
      getSpriteOrigins(this.image, COLON_INDEX, HALF_TILE_SIZE),
      getSpriteOrigins(this.image, secondsIndexes[0], HALF_TILE_SIZE),
      getSpriteOrigins(this.image, secondsIndexes[1], HALF_TILE_SIZE)
    ]

    this.drawTimerDigits(timeOrigins, ctx)
  }

  updateTimer(time) {
    if (this.timer.minutes >= 99 && this.timer.seconds >= 59) return

    const totalSecondsPassed = Math.floor(time.previous / 1000)
    const currentSeconds = totalSecondsPassed % 60

    if (this.timer.seconds === currentSeconds) return
    this.timer.seconds = currentSeconds
    this.timer.minutes = Math.floor(totalSecondsPassed / 60)
  }

  update(time) {
    this.updateTimer(time)
  }

  draw(ctx) {
    ctx.drawImage(this.hudImage, this.position.x, this.position.y)
    this.drawTimer(ctx)
  }
}

export default PlayerHud
