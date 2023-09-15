import Game from './core/Game.js'

window.addEventListener('load', function() {
  const game = new Game()
  game.start()

  /* Dadas las políticas de los navegadores, ya no es posible reproducir ningún sonido hasta
   * que el usuario interactúe primero con la página.
  */
  this.addEventListener('click', () => game.playTheme(), { once: true })
  this.addEventListener('keydown', () => game.playTheme(), { once: true })
})

// No me demandes Nintendo, por favor :(
