type CanvasOptions = {
  elementID: string
}

export function createCanvas(
  opts: CanvasOptions
): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvasElement = document.createElement('canvas')

  window.addEventListener('resize', () => {
    canvasElement.width = window.innerWidth
    canvasElement.height = window.innerHeight
  })

  canvasElement.width = window.innerWidth
  canvasElement.height = window.innerHeight

  canvasElement.setAttribute('id', opts.elementID)
  canvasElement.innerHTML = "Your browser doesn't support HTML5 canvas"

  return [canvasElement, canvasElement.getContext('2d')!]
}
