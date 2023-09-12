import { TILE_SIZE, collisionTile } from '../constants.js'
import { getLastControlDown, isAction } from '../core/inputHandler.js'

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
    const controlDown = getLastControlDown()

    if (isAction(controlDown)) {
      if (this.bombAmount <= 0) return

      const playerCell = {
        row: Math.floor(this.inst.position.y / TILE_SIZE),
        col: Math.floor(this.inst.position.x / TILE_SIZE),
      }

      if (this.inst.levelMap.collisionMap[playerCell.row][playerCell.col] !== collisionTile.EMPTY) return

      this.bombAmount -= 1
      this.lastBombCell = playerCell

      this.inst.addBomb(playerCell, time, this.bombStrength, this.onBombExploded)
    }
  }
}

export default BombPlacer
