class Entity {
  velocity = { x: 0, y: 0 }

  animationFrame = 0
  animationTimer = 0

  constructor(position) {
    this.position = position
  }
}

export default Entity
