import { TILE_SIZE } from '../constants/game.js'
import { CollisionTile } from '../constants/game.js'
import { Control } from '../constants/playermovement.js'
import { isKeyPressed } from '../core/inputHandler.js'

class BombPlacer {
  name = 'bombPlacer'
  bombAmount = 1
  bombStrength = 2
  lastBombCell = null

  constructor(inst) {
    this.inst = inst
  }

  resetLastBombCell(playerCell) {
    if (!this.lastBombCell || (playerCell.row === this.lastBombCell.row &&
        playerCell.col === this.lastBombCell.col)) {
      return
    }

    this.lastBombCell = null
  }

  // Este método existe debido a que BombSystem no tiene acceso ni al jugador ni a este componente.
  onBombExploded = () => {
    if (this.bombAmount === 0) this.bombAmount += 1
  }

  handleBombPlacement(time) {
    if (isKeyPressed(Control.ACTION)) {
      if (this.bombAmount <= 0) return

      const playerCell = {
        row: Math.floor(this.inst.position.y / TILE_SIZE),
        col: Math.floor(this.inst.position.x / TILE_SIZE),
      }

      if (this.inst.levelMap.collisionMap[playerCell.row][playerCell.col] !== CollisionTile.EMPTY) return

      this.bombAmount -= 1
      this.lastBombCell = playerCell

      this.inst.addBomb(playerCell, time, this.bombStrength, this.onBombExploded)
    }
  }
}

export default BombPlacer
