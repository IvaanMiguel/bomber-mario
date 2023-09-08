import { HALF_TILE_SIZE, TILE_SIZE, cornerDirections, direction, movementOrientation, tiles } from '../constants.js';
import * as controlHandler from '../core/inputHandler.js';
import { tileMap } from '../levelsData.js';
import Entity from './Entity.js';

const VELOCITY = 120

class Player {
  constructor(position) {
    this.inst = new Entity({
      x: position.col * TILE_SIZE + HALF_TILE_SIZE,
      y: position.row * TILE_SIZE + HALF_TILE_SIZE
    })

    this.width = 16
    this.height = 16
  }

  getCollisionCoords(playerDirection) {
    const inst = this.inst

    switch(playerDirection) {
      case direction.UP:
        return [
          { row: Math.floor((inst.position.y - 9) / TILE_SIZE), col: Math.floor((inst.position.x - 8) / TILE_SIZE) },
          { row: Math.floor((inst.position.y - 9) / TILE_SIZE), col: Math.floor((inst.position.x + 7) / TILE_SIZE) }
        ]
      case direction.LEFT:
        return [
          { row: Math.floor((inst.position.y - 8) / TILE_SIZE), col: Math.floor((inst.position.x - 9) / TILE_SIZE) },
          { row: Math.floor((inst.position.y + 7) / TILE_SIZE), col: Math.floor((inst.position.x - 9) / TILE_SIZE) }
        ]
      case direction.DOWN:
        return [
          { row: Math.floor((inst.position.y + 8) / TILE_SIZE), col: Math.floor((inst.position.x - 8) / TILE_SIZE) },
          { row: Math.floor((inst.position.y + 8) / TILE_SIZE), col: Math.floor((inst.position.x + 7) / TILE_SIZE) }
        ]
      case direction.RIGHT:
        return [
          { row: Math.floor((inst.position.y - 8) / TILE_SIZE), col: Math.floor((inst.position.x + 8) / TILE_SIZE) },
          { row: Math.floor((inst.position.y + 7) / TILE_SIZE), col: Math.floor((inst.position.x + 8) / TILE_SIZE) }
        ]
    }
  }

  getCollisionTile(collisionCoords) { return tileMap[collisionCoords.row][collisionCoords.col] }

  coordsShouldBlockMovement(collisionCoords) {
    /* Para verificar que ambas mitades de las coordenadas de colisión estén en el mismo tile. */
    const collisionCoordsMatch = collisionCoords[0].row === collisionCoords[1].row &&
        collisionCoords[0].col === collisionCoords[1].col
    const collisionTiles = [this.getCollisionTile(collisionCoords[0]), this.getCollisionTile(collisionCoords[1])]

    return (collisionCoordsMatch && collisionTiles[0] === tiles.WALL) ||
        (collisionTiles[0] === tiles.WALL && collisionTiles[1] === tiles.WALL)
  }

  checkWallCollision(playerDirection) {
    const collisionCoords = this.getCollisionCoords(playerDirection)
    if (this.coordsShouldBlockMovement(collisionCoords)) return [direction.DOWN, { x: 0, y: 0 }]

    const alternativeDirections = cornerDirections[playerDirection]
    if (this.getCollisionTile(collisionCoords[0]) === tiles.WALL) {
      return [alternativeDirections[0], movementOrientation[alternativeDirections[0]]]
    }
    if (this.getCollisionTile(collisionCoords[1]) === tiles.WALL) {
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

  updatePosition(time) {
		this.inst.position.x += this.inst.velocity.x * VELOCITY * .8 * time.secondsPassed
		this.inst.position.y += this.inst.velocity.y * VELOCITY * .8 * time.secondsPassed
	}

  update(time) {
    this.updatePosition(time)
    this.inst.velocity = this.getMovement()[1]
  }

  draw(ctx) {
    ctx.fillRect(
      this.inst.position.x - HALF_TILE_SIZE,
      this.inst.position.y - HALF_TILE_SIZE,
      this.width,
      this.height
    )
  }
}

export default Player
