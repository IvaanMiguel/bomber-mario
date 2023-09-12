import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants.js'
import Player from '../entities/Player.js'
import LevelMap from '../entities/LevelMap.js'
import BombsSystem from './BombsSystem.js'

class Scene {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.ctx.imageSmoothingEnabled = false;

    this.levelMap = new LevelMap()
    this.bombsSystem = new BombsSystem(this.levelMap)
    this.player = new Player(
      { row: 1, col: 1 },
      this.levelMap,
      this.bombsSystem.add,
      this.onGoalReached
    )
  }

  onGoalReached = () => {
    this.player.restartPlayer()
    this.levelMap.regenMap()
    this.bombsSystem.resetBombs()
  }

  draw() {
    this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

    this.levelMap.draw(this.ctx)
    this.bombsSystem.draw(this.ctx)
    this.player.draw(this.ctx)
  }

  update(time) {
    this.bombsSystem.update(time)
    this.player.update(time)
  }
}

export default Scene
