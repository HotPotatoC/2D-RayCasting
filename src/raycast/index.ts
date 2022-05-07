import { cast } from './cast'
import { createLine, drawLine, Line } from './line'
import { createPoint, Point } from './point'

type RayOptions = {
  rayCount?: number
  rayLength?: number
}

export function drawRay(
  ctx: CanvasRenderingContext2D,
  mousePos: Point,
  boundaries: Line[],
  { rayCount = 360, rayLength = 600 }: RayOptions = {}
) {
  const rayAngle = (Math.PI * 2) / rayCount

  for (let i = 0; i < rayCount; i++) {
    const actualEndPoint = createPoint(
      mousePos.x + Math.cos(i * rayAngle) * rayLength,
      mousePos.y + Math.sin(i * rayAngle) * rayLength
    )

    const ray = createLine(mousePos, actualEndPoint)

    for (const boundary of boundaries) {
      const intersection = cast(boundary, ray)

      if (intersection) {
        ray.to = intersection
      }
    }

    const grad = ctx.createLinearGradient(
      ray.from.x,
      ray.from.y,
      actualEndPoint.x,
      actualEndPoint.y
    )

    grad.addColorStop(0, '#fff')
    grad.addColorStop(1, '#ffffff00')

    drawLine(ctx, {
      from: ray.from,
      to: ray.to,
      color: grad,
      width: 1,
    })
  }
}
