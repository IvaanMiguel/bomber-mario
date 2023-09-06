import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants.js'
import Player from '../entities/Player.js'

class Scene {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.ctx.imageSmoothingEnabled = false;

    this.player = new Player({ x: 100, y: 50 })
  }

  draw() {
    this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

    this.player.draw(this.ctx)
  }

  update(time) {
    this.player.update(time)
  }
}

export default Scene
