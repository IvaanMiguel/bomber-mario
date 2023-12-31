import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/game.js'

import BombsSystem from './BombsSystem.js'
import Goal from '../entities/Goal.js'
import LevelMap from '../entities/LevelMap.js'
import Player from '../entities/Player.js'
import PlayerHud from '../entities/PlayerHud.js'

class Scene {
  constructor(time) {
    this.playerHud = new PlayerHud()

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

  draw(ctx) {
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)

    this.playerHud.draw(ctx)

    this.levelMap.draw(ctx)
    this.goal.draw(ctx)

    this.bombsSystem.draw(ctx)

    this.player.draw(ctx)
  }

  update(time) {
    this.playerHud.update(time)
    this.goal.update(time)
    this.bombsSystem.update(time)
    this.player.update(time)
  }
}

export default Scene
