class Entity {
  position = { x: 0, y: 0 }
  velocity = { x: 0, y: 0}

  constructor(position) {
    this.position = position
  }

  // get positionX() { return this.position.x }

  // set positionX(x) { this.position.x = (x <= 0) ? 0 : x }

  // get positionY() { return this.position.y }

  // set positionY(y) { this.position.y = y }
}

export default Entity
