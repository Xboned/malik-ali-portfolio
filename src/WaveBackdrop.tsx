import { useEffect, useRef } from "react"

type Ribbon = {
  y: number
  amp: number
  k: number
  speed: number
  thickness: number
  color: string
  fill: boolean
}

const ribbons: Ribbon[] = [
  {
    y: 0.2,
    amp: 26,
    k: 0.0031,
    speed: 0.00042,
    thickness: 110,
    color: "rgba(214, 190, 255, 0.16)",
    fill: false,
  },
  {
    y: 0.27,
    amp: 18,
    k: 0.0022,
    speed: -0.00028,
    thickness: 90,
    color: "rgba(255, 255, 255, 0.1)",
    fill: false,
  },
  {
    y: 0.34,
    amp: 22,
    k: 0.0038,
    speed: 0.00033,
    thickness: 70,
    color: "rgba(176, 92, 214, 0.18)",
    fill: false,
  },
  {
    y: 0.68,
    amp: 24,
    k: 0.0026,
    speed: 0.0003,
    thickness: 100,
    color: "rgba(214, 190, 255, 0.14)",
    fill: false,
  },
  {
    y: 0.76,
    amp: 20,
    k: 0.0034,
    speed: -0.00036,
    thickness: 85,
    color: "rgba(255, 255, 255, 0.09)",
    fill: false,
  },
  {
    y: 0.84,
    amp: 16,
    k: 0.002,
    speed: 0.00022,
    thickness: 120,
    color: "rgba(140, 60, 190, 0.22)",
    fill: true,
  },
]

function waveY(x: number, t: number, ribbon: Ribbon, base: number) {
  return (
    base +
    Math.sin(x * ribbon.k + t * ribbon.speed) * ribbon.amp +
    Math.sin(x * ribbon.k * 0.41 + t * ribbon.speed * 0.65) * ribbon.amp * 0.45
  )
}

function drawRibbon(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  t: number,
  ribbon: Ribbon,
) {
  const base = ribbon.y * height
  const step = 6
  ctx.beginPath()
  for (let x = 0; x <= width + step; x += step) {
    const y = waveY(x, t, ribbon, base)
    if (x === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }

  if (ribbon.fill) {
    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()
    ctx.fillStyle = ribbon.color
    ctx.fill()
    return
  }

  ctx.strokeStyle = ribbon.color
  ctx.lineWidth = ribbon.thickness
  ctx.lineJoin = "round"
  ctx.stroke()
}

export function WaveBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    let running = !motion.matches

    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function paint(t: number) {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      ctx.clearRect(0, 0, width, height)
      for (const ribbon of ribbons) {
        drawRibbon(ctx, width, height, t, ribbon)
      }
    }

    function tick(now: number) {
      paint(now)
      if (running) frame = requestAnimationFrame(tick)
    }

    function onMotion() {
      running = !motion.matches && document.visibilityState === "visible"
      cancelAnimationFrame(frame)
      if (running) frame = requestAnimationFrame(tick)
      else paint(0)
    }

    size()
    onMotion()
    window.addEventListener("resize", size)
    document.addEventListener("visibilitychange", onMotion)
    motion.addEventListener("change", onMotion)

    return () => {
      running = false
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", size)
      document.removeEventListener("visibilitychange", onMotion)
      motion.removeEventListener("change", onMotion)
    }
  }, [])

  return (
    <>
      <img
        className="wave"
        src="/assets/wave.jpg"
        alt=""
        width={1820}
        height={1024}
      />
      <canvas className="wave-canvas" ref={canvasRef} aria-hidden="true" />
    </>
  )
}
