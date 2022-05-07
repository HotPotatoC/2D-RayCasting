import { createPoint, Point } from '../raycast/point'

export function getMousePosition(canvas: HTMLCanvasElement, event: MouseEvent): Point {
  const rect = canvas.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width
  const y = ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height

  return createPoint(x, y)
}
