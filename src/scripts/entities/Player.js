import {
  CollisionTile,
  OFFSET_Y,
  FRAME_TIME,
  HALF_TILE_SIZE,
  Sprite,
  TILE_SIZE
} from '../constants/game.js';
import {
  Control,
  CornerDirection,
  Direction,
  MovementOrientation
} from '../constants/playermovement.js';
import { addComponent } from '../components/utils.js';
import { isKeyHeld } from '../core/inputHandler.js';
import { PlayerAnimation, PlayerState, WALK_SPEED } from '../constants/player.js';

import BombPlacer from '../components/BombPlacer.js';
import Entity from './Entity.js';
import { playSound, stopSound } from '../core/soundHandler.js';
import { Sound } from '../constants/audio.js';

class Player extends Entity {
  image = Sprite.PLAYER
  playerHithSound = Sound.bombHit
  animation = PlayerAnimation.MoveAnimation[Direction.RIGHT]

  constructor(position, levelMap, goal, addBomb, goalReached, time) {
    super({
      x: position.col * TILE_SIZE + HALF_TILE_SIZE,
      y: position.row * TILE_SIZE + HALF_TILE_SIZE
    })

    addComponent(this, new BombPlacer(this))

    this.width = TILE_SIZE
    this.height = TILE_SIZE

    this.levelMap = levelMap
    this.goal = goal
    this.addBomb = addBomb
    this.goalReached = goalReached

    this.states = {
      [PlayerState.IDLE]: {
        type: PlayerState.IDLE,
        init: this.initIdleState,
        update: this.handleIdleState
      },
      [PlayerState.MOVING]: {
        type: PlayerState.MOVING,
        init: this.initMovingState,
        update: this.handleMovingState
      },
      [PlayerState.DEATH]: {
        type: PlayerState.DEATH,
        init: this.initDeathState,
        update: this.handleDeathState
      }
    }

    this.changeState(PlayerState.IDLE, time)
  }

  changeState(newState, time) {
    this.currentState = this.states[newState]
    this.animationFrame = 0
    this.animationTimer = time.previous + this.animation[this.animationFrame].timer * FRAME_TIME

    this.currentState.init()
  }

  handleMoving(time) {
    const [playerDirection, velocity] = this.getMovement(time)

    if (playerDirection === Direction.RIGHT || playerDirection === Direction.LEFT) {
      this.animation = PlayerAnimation.MoveAnimation[playerDirection]
    }

    return velocity
  }

  initIdleState = () => {
    this.velocity = { x: 0, y: 0 }
  }

  handleIdleState = (time) => {
    const velocity = this.handleMoving(time)

    if (velocity.x === 0 && velocity.y === 0) return

    this.changeState(PlayerState.MOVING, time)
  }

  initMovingState = () => {
    this.animationFrame = 1
  }

  handleMovingState = (time) => {
    this.velocity = this.handleMoving(time)

    if (this.velocity.x !== 0 || this.velocity.y !== 0) return

    this.changeState(PlayerState.IDLE, time)
  }

  initDeathState = () => {
    this.velocity = { x: 0, y: 0 }
    this.animation = PlayerAnimation.DeathAnimation
    playSound(this.playerHithSound.audio, {
      volume: this.playerHithSound.volume,
      wait: true
    })
  }

  handleDeathState = (time) => {
    if (this.animationFrame >= PlayerAnimation.DeathAnimation.length - 1) this.restartPlayer(time)
  }

  getCollisionCoords(playerDirection) {
    switch(playerDirection) {
      case Direction.UP:
        return [
          { row: Math.floor((this.position.y - 9) / TILE_SIZE), col: Math.floor((this.position.x - 8) / TILE_SIZE) },
          { row: Math.floor((this.position.y - 9) / TILE_SIZE), col: Math.floor((this.position.x + 7) / TILE_SIZE) }
        ]
      case Direction.LEFT:
        return [
          { row: Math.floor((this.position.y - 8) / TILE_SIZE), col: Math.floor((this.position.x - 9) / TILE_SIZE) },
          { row: Math.floor((this.position.y + 7) / TILE_SIZE), col: Math.floor((this.position.x - 9) / TILE_SIZE) }
        ]
      case Direction.DOWN:
        return [
          { row: Math.floor((this.position.y + 8) / TILE_SIZE), col: Math.floor((this.position.x - 8) / TILE_SIZE) },
          { row: Math.floor((this.position.y + 8) / TILE_SIZE), col: Math.floor((this.position.x + 7) / TILE_SIZE) }
        ]
      case Direction.RIGHT:
        return [
          { row: Math.floor((this.position.y - 8) / TILE_SIZE), col: Math.floor((this.position.x + 8) / TILE_SIZE) },
          { row: Math.floor((this.position.y + 7) / TILE_SIZE), col: Math.floor((this.position.x + 8) / TILE_SIZE) }
        ]
    }
  }

  allignBetweenWalls(collisionCoords, alternativeDirection, playerDirection, time) {
    const { x, y } = MovementOrientation[alternativeDirection]
    
    // Se presiona arriba o abajo, lo que corregirá la posición entre dos paredes derechas (x = 1) o izquierdas (x = -1).
    if (x !== 0) {
      const nextCollisionCol = Math.floor((this.position.x + this.getNextPosition(x, time) + HALF_TILE_SIZE * x) / TILE_SIZE)
      const nextCellToCollide = this.levelMap.collisionMap[collisionCoords.row][nextCollisionCol]

      if (nextCellToCollide === CollisionTile.BARRIER.WALL) {
        this.position.x = Math.floor((nextCollisionCol - x) * TILE_SIZE + HALF_TILE_SIZE)
  
        return [alternativeDirection, MovementOrientation[playerDirection]]
      }
    }

    // Se presiona izquierda o derecha, lo que corregirá la posición entre dos paredes inferiores (y = 1) o superiores (y = -1).
    if (y !== 0) {
      const nextCollisionRow = Math.floor((this.position.y + this.getNextPosition(y, time) + HALF_TILE_SIZE * y) / TILE_SIZE)
      const nextCellToCollide = this.levelMap.collisionMap[nextCollisionRow][collisionCoords.col]

      if (nextCellToCollide === CollisionTile.BARRIER.WALL) {
        this.position.y = Math.floor((nextCollisionRow - y) * TILE_SIZE + HALF_TILE_SIZE)
  
        return [alternativeDirection, MovementOrientation[playerDirection]]
      }
    }

    return [alternativeDirection, MovementOrientation[alternativeDirection]]
  }

  correctPositionAgainstWall(collisionCoords, playerDirection) {
    const { x, y } = MovementOrientation[playerDirection]

    if (y !== 0) {
      this.position.y = playerDirection === Direction.UP
        ? (collisionCoords[0].row - y) * TILE_SIZE + HALF_TILE_SIZE
        : (collisionCoords[0].row - y) * TILE_SIZE + HALF_TILE_SIZE
    }

    if (x !== 0) {
      this.position.x = playerDirection === Direction.LEFT
        ? (collisionCoords[0].col - x) * TILE_SIZE + HALF_TILE_SIZE
        : (collisionCoords[0].col - x) * TILE_SIZE + HALF_TILE_SIZE
    }
  }

  isBarrierTile(tileValue) {
    return Object.values(CollisionTile.BARRIER).includes(tileValue)
  }

  getCollisionTile(collisionCoords) {
    const collidingTile = this.levelMap.collisionMap[collisionCoords.row][collisionCoords.col]
    const lastBombCell = this.bombPlacer.lastBombCell

    if (collidingTile !== CollisionTile.FLAME && lastBombCell &&
        collisionCoords.row === lastBombCell.row && collisionCoords.col === lastBombCell.col) {
      return CollisionTile.EMPTY
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

      return [playerDirection, { x: 0, y: 0 }]
    }

    const alternativeDirections = CornerDirection[playerDirection]

    if (this.isBarrierTile(collisionTiles[0])) {
      return this.allignBetweenWalls(collisionCoords[0], alternativeDirections[0], playerDirection, time)
    }
    if (this.isBarrierTile(collisionTiles[1])) {
      return this.allignBetweenWalls(collisionCoords[1], alternativeDirections[1], playerDirection, time)
    }

    return [playerDirection, MovementOrientation[playerDirection]]
  }

  getMovement(time){
    if (isKeyHeld(Control.UP)) {
      return this.checkWallCollision(Direction.UP, time)
    } else if (isKeyHeld(Control.LEFT)) {
      return this.checkWallCollision(Direction.LEFT, time)
    } else if (isKeyHeld(Control.DOWN)) {
      return this.checkWallCollision(Direction.DOWN, time)
    } else if (isKeyHeld(Control.RIGHT)) {
      return this.checkWallCollision(Direction.RIGHT, time)
    }

    return [Direction.RIGHT, { x: 0, y: 0 }]
  }

  checkGoalReached(playerCell, time) {
    const goalCoords = this.goal.cell

    if (playerCell.row !== goalCoords.row || playerCell.col !== goalCoords.col) return

    this.goalReached(time)
  }

  checkCellUnderneath(time) {
    const playerCell = {
      row: Math.floor(this.position.y / TILE_SIZE),
      col: Math.floor(this.position.x / TILE_SIZE),
    }

    this.bombPlacer.resetLastBombCell(playerCell)
   
    // Para revisar si se colisiona con una llama.
    if (this.getCollisionTile(playerCell) === CollisionTile.FLAME) {
      this.changeState(PlayerState.DEATH, time)
    }

    this.checkGoalReached(playerCell, time)
  }

  resetPosition() {
    this.position = {
      x: TILE_SIZE + HALF_TILE_SIZE,
      y: TILE_SIZE + HALF_TILE_SIZE
    }
  }

  restartPlayer(time) {
    this.changeState(PlayerState.IDLE, time)
    this.animationFrame = 0
    this.resetPosition()
    this.velocity = { x: 0, y: 0 }
    this.bombPlacer.bombAmount = 1

    stopSound(this.playerHithSound.audio)
  }

  getNextPosition(velocity, time) {
    return velocity * WALK_SPEED * 1.2 * time.secondsPassed
  }

  updatePosition(time) {
    this.position.x += this.getNextPosition(this.velocity.x, time)
		this.position.y += this.getNextPosition(this.velocity.y, time)
	}

  updateAnimation(time) {
    if (time.previous < this.animationTimer || this.currentState.type === PlayerState.IDLE) return

    this.animationFrame += 1
    if (this.animationFrame >= this.animation.length) this.animationFrame = 0

    this.animationTimer = time.previous + (this.animation[this.animationFrame].timer * FRAME_TIME)
  }

  update(time) {
    this.updatePosition(time)
    this.updateAnimation(time)
    this.currentState.update(time)
    this.bombPlacer.handleBombPlacement(time)
    this.checkCellUnderneath(time)
  }

  draw(ctx) {
    const { originX, originY, width, height } = this.animation[this.animationFrame]

    ctx.drawImage(
      this.image,
      originX, originY,
      width, height,
      Math.floor(this.position.x - HALF_TILE_SIZE) + (TILE_SIZE - width) / 2,
      Math.floor(this.position.y - HALF_TILE_SIZE) + (TILE_SIZE - height) / 2 + OFFSET_Y,
      width, height
    )
  }
}

export default Player
