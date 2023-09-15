import { Tile } from '../constants/game.js'
import { CollisionTile } from '../constants/game.js'
import { FlameDirection } from '../constants/bomb.js'

import Bomb from '../entities/Bomb.js'
import BombExplosion from '../entities/BombExplosion.js'
import { playSound } from './soundHandler.js'
import { Sound } from '../constants/audio.js'

class BombsSystem {
  bombs = []
  bombExplosionSound = Sound.bombExplosion

  constructor(levelMap) {
    this.levelMap = levelMap
  }

  resetBombs() {
    this.bombs = []
  }

  checkFlamesCollision(cell) {
    if (this.levelMap.collisionMap[cell.row][cell.col] === CollisionTile.EMPTY) return

    if (this.levelMap.collisionMap[cell.row][cell.col] === CollisionTile.BARRIER.BLOCK) {
      this.levelMap.updateMapAt(cell, Tile.FLOOR, CollisionTile.EMPTY)
    }
  }

  getFlameCells(direction, centerCell, flameLength) {
    const flameCells = []
    let cell = { ...centerCell }

    for (let i = 1; i <= flameLength; i++) {
      cell.row += direction[0]
      cell.col += direction[1]

      if (this.levelMap.collisionMap[cell.row][cell.col] !== CollisionTile.EMPTY) break

      flameCells.push({
        cell: { ...cell },
        isVertical: direction[0] !== 0,
        isLast: i === flameLength
      })
    }

    return { cells: flameCells, lastCell: cell }
  }

  handleBombExploded(time, bomb, bombStrength) {
    const bombIndex = this.bombs.indexOf(bomb)

    if (bombIndex < 0) return

    const flameCells = []

    FlameDirection.forEach(direction => {
      const { cells, lastCell } = this.getFlameCells(direction, bomb.cell, bombStrength)

      this.checkFlamesCollision(lastCell)

      if (cells.length > 0) flameCells.push(...cells)
    })

    this.bombs[bombIndex] = new BombExplosion(bomb.cell, flameCells, this.remove, time)

    this.levelMap.collisionMap[bomb.cell.row][bomb.cell.col] = CollisionTile.FLAME
    flameCells.forEach(flameCell => {
      this.levelMap.collisionMap[flameCell.cell.row][flameCell.cell.col] = CollisionTile.FLAME
    })
  }

  remove = (bombExplosion) => {
    const explosionIndex = this.bombs.indexOf(bombExplosion)

    if (explosionIndex < 0) return
    
    this.bombs.splice(explosionIndex, 1)

    this.levelMap.collisionMap[bombExplosion.cell.row][bombExplosion.cell.col] = CollisionTile.EMPTY
    bombExplosion.flameCells.forEach(flameCell => {
      this.levelMap.collisionMap[flameCell.cell.row][flameCell.cell.col] = CollisionTile.EMPTY
    })
  }

  // Método principal que le da la habilidad al jugador de agregar mecánicamente bombas al juego.
  add = (cell, time, bombStrength, onBombExploded) => {
    this.bombs.push(new Bomb(cell, time, (bomb) => {
      playSound(this.bombExplosionSound.audio, { volume: this.bombExplosionSound.volume })

      onBombExploded(bomb)
      this.handleBombExploded(time, bomb, bombStrength)
    }))

    this.levelMap.collisionMap[cell.row][cell.col] = CollisionTile.BARRIER.BOMB
  }

  draw(ctx) {
    this.bombs.forEach(bomb => bomb.draw(ctx))
  }

  update(time) {
    this.bombs.forEach(bomb => bomb.update(time))
  }
}

export default BombsSystem
