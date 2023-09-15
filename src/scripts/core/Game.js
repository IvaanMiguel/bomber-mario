import { CANVAS_ID, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/game.js'
import { addKeyEventsListeners } from './inputHandler.js'
import { Sound } from '../constants/audio.js'

import Scene from './Scene.js'
import Pause from '../screens/Pause.js'
import { playSound } from './soundHandler.js'

class Game {
  music = Sound.themeMain
  canvas = document.getElementById(CANVAS_ID)
  frameTime = { previous: 0, secondsPassed: 0 }

  constructor() {
    this.musicPlayed = false

    this.ctx = this.canvas.getContext('2d')
    this.ctx.imageSmoothingEnabled = false;

    this.canvas.width = SCREEN_WIDTH
    this.canvas.height = SCREEN_HEIGHT

    this.scene = new Scene(canvas, this.frameTime)
    this.pauseScreen = new Pause()
  }

  update = timestamp => {
    window.requestAnimationFrame(this.update)

    this.pauseScreen.update(this.frameTime)
    this.pauseScreen.draw(this.ctx)

    if (this.pauseScreen.isActive) return

    this.pauseScreen.updateTimeOnScreen(timestamp)

    this.frameTime.secondsPassed = (timestamp - this.pauseScreen.timeOnScreen - this.frameTime.previous) / 1000
		this.frameTime.previous = timestamp - this.pauseScreen.timeOnScreen

    this.scene.update(this.frameTime)
    this.scene.draw(this.ctx)
  }

  playTheme() {
    if (this.musicPlayed) return

    this.musicPlayed = true
    playSound(this.music.audio, { volume: this.music.volume })
  }

  start() {
    addKeyEventsListeners()
    window.requestAnimationFrame(this.update)
  }
}

export default Game
