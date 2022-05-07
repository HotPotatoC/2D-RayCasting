import { Line } from './line'
import type { Point } from './point'
import { createPoint } from './point'

// cast is a function that takes a line and another line and returns the intersection point
export function cast(boundary: Line, pos: Line): Point | null {
  const [x1, x2] = [boundary.from.x, boundary.to.x]
  const [y1, y2] = [boundary.from.y, boundary.to.y]

  const [x3, x4] = [pos.from.x, pos.to.x]
  const [y3, y4] = [pos.from.y, pos.to.y]

  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
  // If the denominator is 0, the two lines are parallel
  if (denominator === 0) {
    return null
  }

  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator
  const u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / denominator

  // The two lines don't intersect if t is outside [0, 1] or u is outside [0, 1]
  if (!(t >= 0 && t <= 1 && u >= 0 && u <= 1)) {
    return null
  }

  return createPoint(x1 + t * (x2 - x1), y1 + t * (y2 - y1))
}
