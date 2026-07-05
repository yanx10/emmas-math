'use client'

import { useEffect, useRef } from 'react'

const COLORS = ['#f472b6', '#fb7185', '#c084fc', '#60a5fa', '#34d399', '#fbbf24', '#f97316']

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  rotation: number
  rotationSpeed: number
  opacity: number
  shape: 'rect' | 'circle' | 'star'
}

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a)
}

export function Confetti({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const animRef = useRef<number>(0)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    particles.current = Array.from({ length: 120 }, () => ({
      x: randomBetween(canvas.width * 0.2, canvas.width * 0.8),
      y: randomBetween(-40, -10),
      vx: randomBetween(-4, 4),
      vy: randomBetween(3, 8),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: randomBetween(6, 14),
      rotation: randomBetween(0, Math.PI * 2),
      rotationSpeed: randomBetween(-0.15, 0.15),
      opacity: 1,
      shape: (['rect', 'circle', 'star'] as const)[Math.floor(Math.random() * 3)],
    }))

    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current = particles.current.filter((p) => p.opacity > 0)

      for (const p of particles.current) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.15
        p.vx *= 0.99
        p.rotation += p.rotationSpeed
        if (p.y > canvas.height * 0.7) p.opacity -= 0.025
        else if (p.y > canvas.height * 0.5) p.opacity -= 0.01

        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)

        if (p.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
        } else if (p.shape === 'star') {
          ctx.beginPath()
          for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2
            const r = i % 2 === 0 ? p.size / 2 : p.size / 4
            ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r)
          }
          ctx.closePath()
          ctx.fill()
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        }

        ctx.restore()
      }

      if (particles.current.length > 0) {
        animRef.current = requestAnimationFrame(draw)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
    />
  )
}
