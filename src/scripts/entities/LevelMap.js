import {
  OFFSET_Y,
  MAX_TOTAL_BLOCKS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  Sprite,
  TILE_SIZE
} from '../constants/game.js'
import TileMaps from '../constants/levelsdata.js'
import { StartTile } from '../constants/player.js'
import { CollisionTile, Tile, TileCollisionMapping, } from '../constants/game.js'

import Entity from './Entity.js'

class LevelMap extends Entity {
  image = Sprite.TILES
  blocks = []
  lastMapIndex = null
  
  constructor() {
    super({ x: 0, y: OFFSET_Y })
    
    this.mapImage = new OffscreenCanvas(SCREEN_WIDTH, SCREEN_HEIGHT)
    this.ctx = this.mapImage.getContext('2d')

    this.tileMap = this.getRandomTileMap()
    this.collisionMap = this.createCollisionMap(this.tileMap)

    this.buildMap()
  }

  createCollisionMap(tileMap) {
    const collisionMap = []

    for (let row = 0; row < tileMap.length; row++) {
      const rowCollisions = []

      for (let col = 0; col < tileMap[0].length; col++) {
        const tile = tileMap[row][col]
        rowCollisions.push(TileCollisionMapping[tile])
      }

      collisionMap.push(rowCollisions)
    }

    return collisionMap
  }

  getRandomTileMap() {
    let mapIndex = null

    do {
      mapIndex = Math.floor(Math.random() * TileMaps.length)
    } while (mapIndex === this.lastMapIndex)

    this.lastMapIndex = mapIndex

    return TileMaps[mapIndex]
  }

  regenMap() {
    this.blocks = []

    this.tileMap = this.getRandomTileMap()
    this.collisionMap = this.createCollisionMap(this.tileMap)

    this.ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
    this.buildMap()
  }

  drawTileMapAt(tile, rowIndex, colIndex) {
    this.ctx.drawImage(
      this.image,
      tile * TILE_SIZE, 0,
      TILE_SIZE, TILE_SIZE,
      TILE_SIZE * colIndex, TILE_SIZE * rowIndex,
      TILE_SIZE, TILE_SIZE
    )
  }

  updateMapAt(cell, tileMap, collisionTile) {
    this.drawTileMapAt(tileMap, cell.row, cell.col)
    this.tileMap[cell.row][cell.col] = tileMap
    this.collisionMap[cell.row][cell.col] = collisionTile
  }

  addBlockTileAt(cell, tileMap, collidingTile) {
    const cellAtStartZone = StartTile.some(([startRow, startCol]) => {
      return startRow === cell.row && startCol === cell.col
    })

    if (cellAtStartZone || this.collisionMap[cell.row][cell.col] !== CollisionTile.EMPTY) {
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

      if (!this.addBlockTileAt(cell, Tile.BLOCK, CollisionTile.BARRIER.BLOCK)) continue

      this.drawTileMapAt(Tile.BLOCK, cell.row, cell.col)

      this.blocks.push(cell)
    }
  }

  buildMap() {
    for (let row = 0; row < this.tileMap.length; row++) {
      for (let col = 0; col < this.tileMap[row].length; col++) {
        const tile = this.tileMap[row][col]
        this.drawTileMapAt(Tile.FLOOR, row, col)
        this.drawTileMapAt(tile, row, col)
      }
    }

    this.addBlocks()
  }

  draw(ctx) {
    ctx.drawImage(this.mapImage, this.position.x, this.position.y)
  }
}

export default LevelMap
