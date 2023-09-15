export function playSound(sound, { volume = 1, wait = false } = {}) {
  if (wait && sound.currentTime > 0) return

  sound.volume = volume

  // Para evitar que los mismos sonidos se solapen y muteen mutuamente.
  if (sound.currentTime > 0) sound.currentTime = 0;

  sound.play()
}

export function stopSound(sound) {
  sound.pause()
  sound.currentTime = 0
}
