import Entity from './Entity.js'
import { tileMap } from '../levelsData.js'
import { TILE_SIZE } from '../constants.js'

const tileColor = {
  10: 'darkgray',
  11: 'darkgreen'
}

class LevelMap {
  constructor() {
    this.inst = new Entity({ x: 0, y: 0 })
    
    this.tileMap = tileMap
    this.mapImage = new OffscreenCanvas(1024, 1024)

    this._buildMap()
  }

  _buildMap() {
    const ctx = this.mapImage.getContext('2d')

    for (let row = 0; row < this.tileMap.length; row++) {
      for (let col = 0; col < this.tileMap[row].length; col++) {
        const tile = this.tileMap[row][col]

        ctx.fillStyle = tileColor[tile]
        ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE)
      }
    }
  }

  draw(ctx) {
    ctx.drawImage(this.mapImage, 0, 0)
  }
}

export default LevelMap
