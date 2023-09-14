import { TILE_SIZE } from '../constants/game.js'

/**
 * @param {HTMLImageElement} image
 * @param {number} tileIndex
 */
export const getSprite = (image, tileIndex) => {
  const tilesWidth = image.width / TILE_SIZE

  return {
    originX: (tileIndex % tilesWidth) * TILE_SIZE,
    originY: Math.floor(tileIndex / tilesWidth) * TILE_SIZE
  }
}
