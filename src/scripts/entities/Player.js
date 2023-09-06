import { SCREEN_HEIGHT, SCREEN_WIDTH, control } from '../constants.js';
import { player_controls } from '../controls.js';
import { getLastControlDown, noControlDown } from '../core/inputHandler.js';
import Entity from './Entity.js';

const VELOCITY = 120

class Player {
  constructor(position) {
    this.inst = new Entity(position)

    this.width = 16
    this.height = 16

    this._mapKeys()
  }

  _mapKeys() {
    const inst = this.inst

    this._mappedControls = {
      [player_controls[control.UP]]: () => {
        if (inst.position.y <= 0) inst.position.y = 0
        inst.velocity = inst.position.y === 0 ? { x: 0, y: 0 } : { x: 0, y: -VELOCITY }
      },
      [player_controls[control.LEFT]]: () => {
        if (inst.position.x <= 0) inst.position.x = 0
        inst.velocity = inst.position.x === 0 ? { x: 0, y: 0 } : { x: -VELOCITY, y: 0 }
      },
      [player_controls[control.DOWN]]: () => {
        if (inst.position.y + this.height >= SCREEN_HEIGHT) inst.position.y = SCREEN_HEIGHT - this.height
        inst.velocity = inst.position.y === SCREEN_HEIGHT - this.height ? { x: 0, y: 0 } : { x: 0, y: VELOCITY }
      },
      [player_controls[control.RIGHT]]: () => {
        if (inst.position.x + this.width >= SCREEN_WIDTH) inst.position.x = SCREEN_WIDTH - this.width
        inst.velocity = inst.position.x === SCREEN_WIDTH - this.width ? { x: 0, y: 0 } : { x: VELOCITY, y: 0 }
      }
    }
  }

  _predictPosition(time, position, velocity) { return position + velocity * time }

  updatePosition(time) {
		this.inst.position.x += this.inst.velocity.x * time.secondsPassed
		this.inst.position.y += this.inst.velocity.y * time.secondsPassed
	}

  update(time) {
    if (noControlDown()) {
      this.inst.velocity = { x: 0, y: 0}
      return
    }

    this.updatePosition(time)

    const controlDown = getLastControlDown()
    this._mappedControls[controlDown]()
  }

  draw(ctx) {
    ctx.fillRect(this.inst.position.x, this.inst.position.y, this.width, this.height)
  }
}

export default Player
