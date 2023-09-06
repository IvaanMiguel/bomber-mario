import { CANVAS_ID, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants.js'
import Scene from './Scene.js'
import { addKeyEventsListeners } from './inputHandler.js'

class Game {
  canvas = document.getElementById(CANVAS_ID)
  scene = new Scene(canvas)
  frameTime = { previous: 0, secondsPassed: 0 }

  constructor() {
    this.canvas.width = SCREEN_WIDTH
    this.canvas.height = SCREEN_HEIGHT
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
