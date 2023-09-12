import { collisionTile, flameDirections, tile } from '../constants.js'
import Bomb from '../entities/Bomb.js'
import BombExplosion from '../entities/BombExplosion.js'

class BombsSystem {
  bombs = []

  constructor(levelMap) {
    this.levelMap = levelMap
  }

  checkFlamesCollision(cell) {
    if (this.levelMap.collisionMap[cell.row][cell.col] === collisionTile.EMPTY) return

    if (this.levelMap.collisionMap[cell.row][cell.col] === collisionTile.BARRIER.BLOCK) {
      this.levelMap.updateMapAt(cell, tile.FLOOR, collisionTile.EMPTY)
    }
  }

  getFlameCells(direction, centerCell, flameLength) {
    const flameCells = []
    let cell = { ...centerCell }

    for (let i = 1; i <= flameLength; i++) {
      cell.row += direction[0]
      cell.col += direction[1]

      if (this.levelMap.collisionMap[cell.row][cell.col] !== collisionTile.EMPTY) break

      flameCells.push({ ...cell })
    }

    return { cells: flameCells, lastCell: cell }
  }

  handleBombExploded(time, bomb, bombStrength) {
    const bombIndex = this.bombs.indexOf(bomb)

    if (bombIndex < 0) return

    const flameCells = []

    flameDirections.forEach(direction => {
      const { cells, lastCell } = this.getFlameCells(direction, bomb.cell, bombStrength)

      this.checkFlamesCollision(lastCell)

      if (cells.length > 0) flameCells.push(...cells)
    })

    this.bombs[bombIndex] = new BombExplosion(bomb.cell, flameCells, this.remove, time)

    this.levelMap.collisionMap[bomb.cell.row][bomb.cell.col] = collisionTile.FLAME
    flameCells.forEach(flameCell => {
      this.levelMap.collisionMap[flameCell.row][flameCell.col] = collisionTile.FLAME
    })
  }

  remove = (bombExplosion) => {
    const explosionIndex = this.bombs.indexOf(bombExplosion)

    if (explosionIndex < 0) return
    
    this.bombs.splice(explosionIndex, 1)

    this.levelMap.collisionMap[bombExplosion.cell.row][bombExplosion.cell.col] = collisionTile.EMPTY
    bombExplosion.flameCells.forEach(flameCell => {
      this.levelMap.collisionMap[flameCell.row][flameCell.col] = collisionTile.EMPTY
    })
  }

  // Método principal que le da la habilidad al jugador de agregar mecánicamente bombas al juego.
  add = (cell, time, bombStrength, onBombExploded) => {
    this.bombs.push(new Bomb(cell, time, (bomb) => {
      onBombExploded(bomb)
      this.handleBombExploded(time, bomb, bombStrength)
    }))

    this.levelMap.collisionMap[cell.row][cell.col] = collisionTile.BARRIER.BOMB
  }

  draw(ctx) {
    this.bombs.forEach(bomb => bomb.draw(ctx))
  }

  update(time) {
    this.bombs.forEach(bomb => bomb.update(time))
  }
}

export default BombsSystem
