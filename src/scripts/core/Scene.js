import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/game.js'

import Player from '../entities/Player.js'
import LevelMap from '../entities/LevelMap.js'
import BombsSystem from './BombsSystem.js'
import Goal from '../entities/Goal.js'

class Scene {
  constructor(canvas, time) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.ctx.imageSmoothingEnabled = false;

    this.levelMap = new LevelMap()
    this.goal = new Goal(this.levelMap, time)

    this.bombsSystem = new BombsSystem(this.levelMap)

    this.player = new Player(
      { row: 1, col: 1 },
      this.levelMap,
      this.goal,
      this.bombsSystem.add,
      this.onGoalReached,
      time
    )
  }

  onGoalReached = (time) => {
    this.player.restartPlayer(time)
    this.levelMap.regenMap()
    this.goal.resetGoal()
    this.bombsSystem.resetBombs()
  }

  draw() {
    this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

    this.levelMap.draw(this.ctx)
    this.goal.draw(this.ctx)
    this.bombsSystem.draw(this.ctx)
    this.player.draw(this.ctx)
  }

  update(time) {
    this.goal.update(time)
    this.bombsSystem.update(time)
    this.player.update(time)
  }
}

export default Scene
