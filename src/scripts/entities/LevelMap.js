import {
  MAX_TOTAL_BLOCKS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  TILE_SIZE,
  collisionTile,
  startTiles,
  tile
} from '../constants.js'
import Entity from './Entity.js'
import { collisionMap, tileMap } from '../levelsData.js'

const tileColor = {
  10: 'darkgray',
  11: 'darkgreen',
  12: 'lightgray',
  13: 'purple'
}

class LevelMap extends Entity {
  tileMap = structuredClone(tileMap)
  collisionMap = structuredClone(collisionMap)
  goalCoords = { row: 0, col: 0 }
  blocks = []
  
  constructor() {
    super({ x: 0, y: 0 })
    
    this.mapImage = new OffscreenCanvas(SCREEN_WIDTH, SCREEN_HEIGHT)
    this.ctx = this.mapImage.getContext('2d')

    this.buildMap()
  }

  regenMap() {
    this.blocks = []
    this.tileMap = structuredClone(tileMap)
    this.collisionMap = structuredClone(collisionMap)

    this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
    this.buildMap()
  }

  updateMapAt(cell, tileMap, collisionTile) {
    this.ctx.fillStyle = tileColor[tileMap]
    this.ctx.fillRect(cell.col * TILE_SIZE, cell.row * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    this.tileMap[cell.row][cell.col] = tileMap
    this.collisionMap[cell.row][cell.col] = collisionTile
  }

  addBlockTileAt(cell, tileMap, collidingTile) {
    const cellAtStartZone = startTiles.some(([startRow, startCol]) => {
      return startRow === cell.row && startCol === cell.col
    })

    if (cellAtStartZone || this.collisionMap[cell.row][cell.col] !== collisionTile.EMPTY) {
      return false
    }
    
    this.updateMapAt(cell, tileMap, collidingTile)

    return true
  }

  addBlocks() {
    while (this.blocks.length < MAX_TOTAL_BLOCKS) {
      const cell = {
        row: 1 + Math.floor(Math.random() * (this.tileMap.length - 2)),
        col: 1 + Math.floor(Math.random() * (this.tileMap[0].length - 2))
      }

      if (!this.addBlockTileAt(cell, tile.BLOCK, collisionTile.BARRIER.BLOCK)) continue

      this.blocks.push(cell)
    }
  }

  addGoal() {
    const index = Math.floor(Math.random() * this.blocks.length)
    this.goalCoords = this.blocks[index]
    
    this.tileMap[this.goalCoords.row][this.goalCoords.col] = tile.GOAL
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
    this.addGoal()
  }

  drawGoal(ctx) {
    ctx.fillStyle = tileColor[13]
    ctx.fillRect(this.goalCoords.col * TILE_SIZE, this.goalCoords.row * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  draw(ctx) {
    ctx.drawImage(this.mapImage, this.position.x, this.position.y)

    if (this.collisionMap[this.goalCoords.row][this.goalCoords.col] === collisionTile.BARRIER.BLOCK) return

    this.drawGoal(ctx)
  }
}

export default LevelMap
