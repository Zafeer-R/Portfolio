/** Shared race state. Written by the scroll tracker and read every frame by the canvas and the HUD. */
export type Stage = { id: string; label: string; color: string }

/** One lap per section. Colors follow F1 timing screens: red, white, purple for fastest lap, green and yellow sectors. */
export const STAGES: Stage[] = [
  { id: 'top', label: 'Blueprint', color: '#00d2be' },
  { id: 'telemetry', label: 'Chassis', color: '#00d2be' },
  { id: 'fastest', label: 'Aero package', color: '#00d2be' },
  { id: 'projects', label: 'Power unit', color: '#00d2be' },
  { id: 'process', label: 'Race strategy', color: '#00d2be' },
  { id: 'experience', label: 'Stints', color: '#00d2be' },
  { id: 'skills', label: 'Components', color: '#00d2be' },
  { id: 'faq', label: 'Team radio', color: '#00d2be' },
  { id: 'finish', label: 'Chequered flag', color: '#ffffff' },
]

export const race = {
  /** performance.now() when the lights went out, or 0 while the grid is still waiting. */
  launchedAt: 0,
  /** 0 to 1, smoothed scroll speed. */
  speed: 0,
  /** DRS boost remaining, 0 to 1. */
  boost: 0,
  stage: 0,
  /** 0 to 1 progress down the page. */
  progress: 0,
}

export const launchRace = () => {
  if (!race.launchedAt) race.launchedAt = performance.now()
}
export const resetRace = () => {
  race.launchedAt = 0
}
export const setSpeed = (v: number) => {
  race.speed = v
}
export const setBoost = (v: number) => {
  race.boost = v
}
export const setStage = (i: number) => {
  race.stage = i
}
export const setProgress = (v: number) => {
  race.progress = v
}

export const hexToRgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
