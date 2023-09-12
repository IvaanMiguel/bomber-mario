import {
  HALF_TILE_SIZE,
  TILE_SIZE,
  cornerDirections,
  direction,
  movementOrientation,
  collisionTile,
  WALK_SPEED,
  tile,
} from '../constants.js';
import BombPlacer from '../components/BombPlacer.js';
import { addComponent } from '../components/utils.js';
import * as controlHandler from '../core/inputHandler.js';
import Entity from './Entity.js';

class Player extends Entity {
  constructor(position, levelMap, addBomb) {
    super({
      x: position.col * TILE_SIZE + HALF_TILE_SIZE,
      y: position.row * TILE_SIZE + HALF_TILE_SIZE
    })

    addComponent(this, new BombPlacer(this))

    this.width = 16
    this.height = 16

    this.levelMap = levelMap
    this.addBomb = addBomb
  }

  getCollisionCoords(playerDirection) {
    switch(playerDirection) {
      case direction.UP:
        return [
          { row: Math.floor((this.position.y - 9) / TILE_SIZE), col: Math.floor((this.position.x - 8) / TILE_SIZE) },
          { row: Math.floor((this.position.y - 9) / TILE_SIZE), col: Math.floor((this.position.x + 7) / TILE_SIZE) }
        ]
      case direction.LEFT:
        return [
          { row: Math.floor((this.position.y - 8) / TILE_SIZE), col: Math.floor((this.position.x - 9) / TILE_SIZE) },
          { row: Math.floor((this.position.y + 7) / TILE_SIZE), col: Math.floor((this.position.x - 9) / TILE_SIZE) }
        ]
      case direction.DOWN:
        return [
          { row: Math.floor((this.position.y + 8) / TILE_SIZE), col: Math.floor((this.position.x - 8) / TILE_SIZE) },
          { row: Math.floor((this.position.y + 8) / TILE_SIZE), col: Math.floor((this.position.x + 7) / TILE_SIZE) }
        ]
      case direction.RIGHT:
        return [
          { row: Math.floor((this.position.y - 8) / TILE_SIZE), col: Math.floor((this.position.x + 8) / TILE_SIZE) },
          { row: Math.floor((this.position.y + 7) / TILE_SIZE), col: Math.floor((this.position.x + 8) / TILE_SIZE) }
        ]
    }
  }

  allignBetweenWalls(collisionCoords, alternativeDirection, playerDirection, time) {
    const { x, y } = movementOrientation[alternativeDirection]
    
    // Se presiona arriba o abajo, lo que corregirá la posición entre dos paredes derechas (x = 1) o izquierdas (x = -1).
    if (x !== 0) {
      const nextCollisionCol = Math.floor((this.position.x + this.getNextPosition(x, time) + HALF_TILE_SIZE * x) / TILE_SIZE)
      const nextCellToCollide = this.levelMap.collisionMap[collisionCoords.row][nextCollisionCol]

      if (nextCellToCollide === collisionTile.BARRIER.WALL) {
        this.position.x = Math.floor((nextCollisionCol - x) * TILE_SIZE + HALF_TILE_SIZE)
  
        return [alternativeDirection, movementOrientation[playerDirection]]
      }
    }

    // Se presiona izquierda o derecha, lo que corregirá la posición entre dos paredes inferiores (y = 1) o superiores (y = -1).
    if (y !== 0) {
      const nextCollisionRow = Math.floor((this.position.y + this.getNextPosition(y, time) + HALF_TILE_SIZE * y) / TILE_SIZE)
      const nextCellToCollide = this.levelMap.collisionMap[nextCollisionRow][collisionCoords.col]

      if (nextCellToCollide === collisionTile.BARRIER.WALL) {
        this.position.y = Math.floor((nextCollisionRow - y) * TILE_SIZE + HALF_TILE_SIZE)
  
        return [alternativeDirection, movementOrientation[playerDirection]]
      }
    }

    return [alternativeDirection, movementOrientation[alternativeDirection]]
  }

  correctPositionAgainstWall(collisionCoords, playerDirection) {
    const { x, y } = movementOrientation[playerDirection]

    if (y !== 0) {
      this.position.y = playerDirection === direction.UP
        ? (collisionCoords[0].row - y) * TILE_SIZE + HALF_TILE_SIZE
        : (collisionCoords[0].row - y) * TILE_SIZE + HALF_TILE_SIZE
    }

    if (x !== 0) {
      this.position.x = playerDirection === direction.LEFT
        ? (collisionCoords[0].col - x) * TILE_SIZE + HALF_TILE_SIZE
        : (collisionCoords[0].col - x) * TILE_SIZE + HALF_TILE_SIZE
    }
  }

  isBarrierTile(tileValue) {
    return Object.values(collisionTile.BARRIER).includes(tileValue)
  }

  getCollisionTile(collisionCoords) {
    const collidingTile = this.levelMap.collisionMap[collisionCoords.row][collisionCoords.col]
    const lastBombCell = this.bombPlacer.lastBombCell

    if (collidingTile !== collisionTile.FLAME && lastBombCell &&
        collisionCoords.row === lastBombCell.row && collisionCoords.col === lastBombCell.col) {
      return collisionTile.EMPTY
    }

    return collidingTile
  }

  coordsShouldBlockMovement(collisionCoords, collisionTiles) {
    /* Para verificar que ambas mitades de las coordenadas de colisión estén en el mismo tile. */
    const collisionCoordsMatch = collisionCoords[0].row === collisionCoords[1].row &&
        collisionCoords[0].col === collisionCoords[1].col

    return (collisionCoordsMatch && this.isBarrierTile(collisionTiles[0])) ||
        (this.isBarrierTile(collisionTiles[0]) && this.isBarrierTile(collisionTiles[1]))
  }

  checkWallCollision(playerDirection, time) {
    const collisionCoords = this.getCollisionCoords(playerDirection)
    const collisionTiles = [
      this.getCollisionTile(collisionCoords[0]),
      this.getCollisionTile(collisionCoords[1])
    ]

    if (this.coordsShouldBlockMovement(collisionCoords, collisionTiles)) {
      this.correctPositionAgainstWall(collisionCoords, playerDirection)

      return [direction.DOWN, { x: 0, y: 0 }]
    }

    const alternativeDirections = cornerDirections[playerDirection]

    if (this.isBarrierTile(collisionTiles[0])) {
      return this.allignBetweenWalls(collisionCoords[0], alternativeDirections[0], playerDirection, time)
    }
    if (this.isBarrierTile(collisionTiles[1])) {
      return this.allignBetweenWalls(collisionCoords[1], alternativeDirections[1], playerDirection, time)
    }

    return [playerDirection, movementOrientation[playerDirection]]
  }

  getMovement(time){
    const controlDown = controlHandler.getLastControlDown()

    if (controlHandler.isUp(controlDown)) {
      return this.checkWallCollision(direction.UP, time)
    } else if (controlHandler.isLeft(controlDown)) {
      return this.checkWallCollision(direction.LEFT, time)
    } else if (controlHandler.isDown(controlDown)) {
      return this.checkWallCollision(direction.DOWN, time)
    } else if (controlHandler.isRight(controlDown)) {
      return this.checkWallCollision(direction.RIGHT, time)
    }

    return [direction.DOWN, { x: 0, y: 0 }]
  }

  checkGoalReached(playerCell) {
    const goalCoords = this.levelMap.goalCoords

    if (playerCell.row === goalCoords.row && playerCell.col === goalCoords.col) {
      this.resetPosition()
      this.levelMap.regenMap()
    }
  }

  checkCellUnderneath() {
    const playerCell = {
      row: Math.floor(this.position.y / TILE_SIZE),
      col: Math.floor(this.position.x / TILE_SIZE),
    }

    this.bombPlacer.resetLastBombCell(playerCell)
   
    // Para revisar si se colisiona con una llama.
    if (this.getCollisionTile(playerCell) === collisionTile.FLAME) {
      this.resetPosition()
    }

    this.checkGoalReached(playerCell)
  }

  resetPosition() {
    this.position = {
      x: TILE_SIZE + HALF_TILE_SIZE,
      y: TILE_SIZE + HALF_TILE_SIZE
    }
  }

  getNextPosition(velocity, time) {
    return velocity * WALK_SPEED * 1.2 * time.secondsPassed
  }

  updatePosition(time) {
    this.position.x += this.getNextPosition(this.velocity.x, time)
		this.position.y += this.getNextPosition(this.velocity.y, time)
	}

  update(time) {
    this.updatePosition(time)
    this.velocity = this.getMovement(time)[1]
    this.bombPlacer.handleBombPlacement(time)
    this.checkCellUnderneath()
  }

  draw(ctx) {
    ctx.fillStyle = 'black'
    ctx.fillRect(
      this.position.x - HALF_TILE_SIZE,
      this.position.y - HALF_TILE_SIZE,
      this.width,
      this.height
    )
  }
}

export default Player
