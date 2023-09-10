import {
  HALF_TILE_SIZE,
  TILE_SIZE,
  cornerDirections,
  direction,
  movementOrientation,
  collisionTile,
  WALK_SPEED,
} from '../constants.js';
import BombPlacer from '../components/BombPlacer.js';
import { addComponent } from '../components/utils.js';
import * as controlHandler from '../core/inputHandler.js';
import { collisionMap } from '../levelsData.js';
import Entity from './Entity.js';

class Player extends Entity {
  constructor(position, addBomb) {
    super({
      x: position.col * TILE_SIZE + HALF_TILE_SIZE,
      y: position.row * TILE_SIZE + HALF_TILE_SIZE
    })

    addComponent(this, new BombPlacer(this))

    this.width = 16
    this.height = 16

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

  correctPositionAgainstWall(collisionCoords, playerDirection) {
    const { x, y } = movementOrientation[playerDirection]

    if (y !== 0) {
      this.position.y = playerDirection === direction.UP
        ? (collisionCoords[0].row + 1) * TILE_SIZE + HALF_TILE_SIZE
        : (collisionCoords[0].row - 1) * TILE_SIZE + HALF_TILE_SIZE
    }

    if (x !== 0) {
      this.position.x = playerDirection === direction.LEFT
        ? (collisionCoords[0].col + 1) * TILE_SIZE + HALF_TILE_SIZE
        : (collisionCoords[0].col - 1) * TILE_SIZE + HALF_TILE_SIZE
    }
  }

  isBarrierTile(tileValue) {
    return Object.values(collisionTile.BARRIER).includes(tileValue)
  }

  getCollisionTile(collisionCoords) {
    const collidingTile = collisionMap[collisionCoords.row][collisionCoords.col]
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

  checkWallCollision(playerDirection) {
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
      return [alternativeDirections[0], movementOrientation[alternativeDirections[0]]]
    }
    if (this.isBarrierTile(collisionTiles[1])) {
      return [alternativeDirections[1], movementOrientation[alternativeDirections[1]]]
    }

    return [playerDirection, movementOrientation[playerDirection]]
  }

  getMovement(){
    const controlDown = controlHandler.getLastControlDown()

    if (controlHandler.isUp(controlDown)) {
      return this.checkWallCollision(direction.UP)
    } else if (controlHandler.isLeft(controlDown)) {
      return this.checkWallCollision(direction.LEFT)
    } else if (controlHandler.isDown(controlDown)) {
      return this.checkWallCollision(direction.DOWN)
    } else if (controlHandler.isRight(controlDown)) {
      return this.checkWallCollision(direction.RIGHT)
    }

    return [direction.DOWN, { x: 0, y: 0 }]
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
  }

  resetPosition() {
    this.position = {
      x: TILE_SIZE + HALF_TILE_SIZE,
      y: TILE_SIZE + HALF_TILE_SIZE
    }
  }

  updatePosition(time) {
    this.position.x += this.velocity.x * WALK_SPEED * 1.2 * time.secondsPassed
		this.position.y += this.velocity.y * WALK_SPEED * 1.2 * time.secondsPassed
	}

  update(time) {
    this.updatePosition(time)
    this.velocity = this.getMovement()[1]
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
