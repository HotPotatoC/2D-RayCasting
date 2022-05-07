import { Point } from './point';

export type Line = { from: Point; to: Point }

export function createLine(from: Point, to: Point): Line {
  return { from, to }
}

type LineOption = {
  from: Point
  to: Point
  color?: string | CanvasGradient
  width?: number
}

// drawLine draws a line on the canvas then returns the vector between the two points
export function drawLine(
  ctx: CanvasRenderingContext2D,
  { from, to, color = '#fff', width = 4 }: LineOption
) {
  ctx.strokeStyle = color
  ctx.lineWidth = width

  ctx.beginPath()
  ctx.moveTo(from.x, from.y)
  ctx.lineTo(to.x, to.y)
  ctx.stroke()
}
