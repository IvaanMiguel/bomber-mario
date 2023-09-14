import { addKeyEventsListeners } from './inputHandler.js'
import { CANVAS_ID, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/game.js'

import Scene from './Scene.js'

class Game {
  canvas = document.getElementById(CANVAS_ID)
  frameTime = { previous: 0, secondsPassed: 0 }

  constructor() {
    this.canvas.width = SCREEN_WIDTH
    this.canvas.height = SCREEN_HEIGHT

    this.scene = new Scene(canvas, this.frameTime)
  }

  update = timestamp => {
    window.requestAnimationFrame(this.update)

    this.frameTime.secondsPassed = (timestamp - this.frameTime.previous) / 1000
		this.frameTime.previous = timestamp

    this.scene.update(this.frameTime)
    this.scene.draw()
  }

  start() {
    addKeyEventsListeners()
    window.requestAnimationFrame(this.update)
  }
}

export default Game
