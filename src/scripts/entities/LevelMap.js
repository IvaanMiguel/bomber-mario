import {
  MAX_TOTAL_BLOCKS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  TILE_SIZE,
  CollisionTile,
  startTiles,
  Tile,
  tileCollisionMapping,
  BACKGROUND_COLOR
} from '../constants.js'
import Entity from './Entity.js'
import TileMaps from '../levelsData.js'

const tileColor = {
  13: 'purple'
}

class LevelMap extends Entity {
  image = document.getElementById('tiles')
  goalCoords = { row: 0, col: 0 }
  blocks = []
  lastMapIndex = null
  
  constructor() {
    super({ x: 0, y: 0 })
    
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
        rowCollisions.push(tileCollisionMapping[tile])
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
    const cellAtStartZone = startTiles.some(([startRow, startCol]) => {
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

  addGoal() {
    const index = Math.floor(Math.random() * this.blocks.length)
    this.goalCoords = this.blocks[index]
    
    this.tileMap[this.goalCoords.row][this.goalCoords.col] = Tile.GOAL
  }

  strokeCorner() {
    this.ctx.strokeStyle = BACKGROUND_COLOR
    this.ctx.lineWidth = 2
    this.ctx.strokeRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)
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
    this.addGoal()

    this.strokeCorner()
  }

  drawGoal(ctx) {
    ctx.fillStyle = tileColor[13]
    ctx.fillRect(this.goalCoords.col * TILE_SIZE, this.goalCoords.row * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  draw(ctx) {
    ctx.drawImage(this.mapImage, this.position.x, this.position.y)

    if (this.collisionMap[this.goalCoords.row][this.goalCoords.col] === CollisionTile.BARRIER.BLOCK) return

    this.drawGoal(ctx)
  }
}

export default LevelMap
