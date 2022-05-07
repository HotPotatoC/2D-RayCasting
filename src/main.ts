import { createCanvas } from './canvas'
import { drawRay } from './raycast'
import type { Line } from './raycast/line'
import { createLine, drawLine } from './raycast/line'
import type { Point } from './raycast/point'
import { createPoint } from './raycast/point'
import './style.css'
import { getMousePosition } from './utils/mouse'
import { randomRange } from './utils/random'

let mousePos: Point = createPoint(-9999, -9999)

function generateRandomWalls(canvasElement: HTMLCanvasElement, n: number = 4) {
  let walls = []

  for (let i = 0; i < n; i++) {
    const from = createPoint(
      randomRange(canvasElement.width + 20, 50),
      randomRange(50, canvasElement.height - 20)
    )

    const to = createPoint(
      randomRange(canvasElement.width + 20, 50),
      randomRange(50, canvasElement.height - 20)
    )

    walls.push(createLine(from, to))
  }

  return walls
}

function update(canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D, walls: Line[]) {
  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)

  ctx.fillStyle = "#000"
  ctx.fillRect(0, 0, canvasElement.width, canvasElement.height)

  walls.forEach((wall) => {
    drawLine(ctx, {
      from: wall.from,
      to: wall.to,
    })
  })

  drawRay(ctx, mousePos, walls)

  requestAnimationFrame(() => update(canvasElement, ctx, walls))
}

function main() {
  const app = document.querySelector<HTMLDivElement>('#app')!

  const [canvasElement, ctx] = createCanvas({
    elementID: 'canvas',
  })

  app.appendChild(canvasElement)

  canvasElement.onmousemove = (event: MouseEvent) => {
    mousePos = getMousePosition(canvasElement, event)
  }

  const walls = generateRandomWalls(canvasElement)

  update(canvasElement, ctx, walls)
}

main()
