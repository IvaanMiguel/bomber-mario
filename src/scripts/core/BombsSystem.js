import { collisionTile, flameDirections } from '../constants.js'
import Bomb from '../entities/Bomb.js'
import BombExplosion from '../entities/BombExplosion.js'
import { collisionMap } from '../levelsData.js'

class BombsSystem {
  bombs = []

  getFlameCells(direction, centerCell, flameLength) {
    const flameCells = []
    let cell = { ...centerCell }

    for (let i = 1; i <= flameLength; i++) {
      cell.row += direction[0]
      cell.col += direction[1]

      if (collisionMap[cell.row][cell.col] !== collisionTile.EMPTY) break

      flameCells.push({ ...cell })
    }

    return flameCells
  }

  handleBombExploded(time, bomb, bombStrength) {
    const bombIndex = this.bombs.indexOf(bomb)

    if (bombIndex < 0) return

    const flameCells = []

    flameDirections.forEach(direction => {
      const cells = this.getFlameCells(direction, bomb.cell, bombStrength)

      if (cells.length > 0) flameCells.push(...cells)
    })

    this.bombs[bombIndex] = new BombExplosion(bomb.cell, flameCells, this.remove, time)

    collisionMap[bomb.cell.row][bomb.cell.col] = collisionTile.FLAME
    flameCells.forEach(flameCell => {
      collisionMap[flameCell.row][flameCell.col] = collisionTile.FLAME
    })
  }

  remove = (bombExplosion) => {
    const explosionIndex = this.bombs.indexOf(bombExplosion)

    if (explosionIndex < 0) return
    
    this.bombs.splice(explosionIndex, 1)

    collisionMap[bombExplosion.cell.row][bombExplosion.cell.col] = collisionTile.EMPTY
    bombExplosion.flameCells.forEach(flameCell => {
      collisionMap[flameCell.row][flameCell.col] = collisionTile.EMPTY
    })
  }

  // Método principal que le da la habilidad al jugador de agregar mecánicamente bombas al juego.
  add = (cell, time, bombStrength, onBombExploded) => {
    this.bombs.push(new Bomb(cell, time, (bomb) => {
      onBombExploded(bomb)
      this.handleBombExploded(time, bomb, bombStrength)
    }))

    collisionMap[cell.row][cell.col] = collisionTile.BARRIER.BOMB
  }

  draw(ctx) {
    this.bombs.forEach(bomb => bomb.draw(ctx))
  }

  update(time) {
    this.bombs.forEach(bomb => bomb.update(time))
  }
}

export default BombsSystem
