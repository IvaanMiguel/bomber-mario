import { TILE_SIZE } from '../constants/game.js'

/**
 * @param {HTMLImageElement} image
 * @param {number} tileIndex
 * @param {number} tileSize
 */
export const getSpriteOrigins = (image, tileIndex, tileSize = TILE_SIZE) => {
  const tilesWidth = image.width / tileSize

  return {
    originX: (tileIndex % tilesWidth) * tileSize,
    originY: Math.floor(tileIndex / tilesWidth) * tileSize
  }
}
