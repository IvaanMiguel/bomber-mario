import Entity from './Entity.js'
import { collisionMap, tileMap } from '../levelsData.js'
import { MAX_TOTAL_BLOCKS, TILE_SIZE, collisionTile, startTiles } from '../constants.js'

const tileColor = {
  10: 'darkgray',
  11: 'darkgreen',
  12: 'gray'
}

class LevelMap extends Entity {
  constructor() {
    super({ x: 0, y: 0 })
    
    this.tileMap = tileMap
    this.mapImage = new OffscreenCanvas(1024, 1024)
    this.ctx = this.mapImage.getContext('2d')

    this.buildMap()
  }

  addBlockTileAt(cell) {
    const cellAtStartZone = startTiles.some(([startRow, startCol]) => {
      return startRow === cell.row && startCol === cell.col
    })

    if (cellAtStartZone || collisionMap[cell.row][cell.col] !== collisionTile.EMPTY) {
      return false
    }
    
    this.ctx.fillRect(cell.col * TILE_SIZE, cell.row * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    collisionMap[cell.row][cell.col] = collisionTile.BARRIER.BLOCK

    return true
  }

  addBlocks() {
    const blocks = []

    this.ctx.fillStyle = 'lightgray'
    while (blocks.length < MAX_TOTAL_BLOCKS) {
      const cell = {
        row: 1 + Math.floor(Math.random() * (tileMap.length - 2)),
        col: 1 + Math.floor(Math.random() * (tileMap[0].length - 2))
      }

      if (this.addBlockTileAt(cell)) blocks.push(cell)
    }
  }

  buildMap() {
    for (let row = 0; row < this.tileMap.length; row++) {
      for (let col = 0; col < this.tileMap[row].length; col++) {
        const tile = this.tileMap[row][col]

        this.ctx.fillStyle = tileColor[tile]
        this.ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE)
      }
    }

    this.addBlocks()
  }

  draw(ctx) {
    ctx.drawImage(this.mapImage, this.position.x, this.position.y)
  }
}

export default LevelMap
