import { collisionTile } from '../constants.js'
import Bomb from '../entities/Bomb.js'
import { collisionMap } from '../levelsData.js'

class BombsSystem {
  bombs = []

  remove = (bomb) => {
    const index = this.bombs.indexOf(bomb)
    if (index < 0) return
    
    this.bombs.splice(index, 1)
    collisionMap[bomb.cell.row][bomb.cell.col] = collisionTile.EMPTY
  }

  add = (cell, time, onBombExploded) => {
    this.bombs.push(new Bomb(cell, time, (bomb) => {
      this.remove(bomb)
      onBombExploded(bomb)
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
