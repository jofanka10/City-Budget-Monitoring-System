import { useEffect, useRef } from 'react'
import './Graph.css'

function Graph({ transactions }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const width = rect.width
    const height = rect.height

    const formatRupiah = (value) =>
      "Rp " + value.toLocaleString('id-ID', { minimumFractionDigits: 0 })

    const calculateData = () => {
      const data = []
      let runningIncome = 0
      let runningExpense = 0

      transactions.slice().reverse().forEach((transaction) => {
        if (transaction.type === 'income') runningIncome += transaction.amount
        else runningExpense += transaction.amount

        data.push({
          income: runningIncome,
          expense: runningExpense,
          balance: runningIncome - runningExpense,
          date: transaction.date || ""
        })
      })
      return data
    }

    const data = calculateData()

    let niceMax = 100000
    let niceMin = -100000
    let niceRange = 200000

    if (data.length > 0) {
      const values = data.flatMap((d) => [d.income, d.expense, d.balance])
      const min = Math.min(...values, 0)
      const max = Math.max(...values, 0)

      const buffer = Math.abs(max - min) * 0.1
      niceMax = max + buffer
      niceMin = min - buffer
      niceRange = niceMax - niceMin
    }

    // ⬇ Dynamic padding diperbaiki
    const testValues = [niceMax, niceMin]
    const longestLabel = Math.max(
      ...testValues.map(v => formatRupiah(v | 0).length)
    )
    const leftPadding = Math.max(60, 20 + longestLabel * 7.5)
    const labelMargin = 22
    // ⬆ Dynamic padding diperbaiki

    const rightPadding = 30
    const topPadding = 20
    const bottomPadding = 60

    const chartWidth = width - leftPadding - rightPadding
    const chartHeight = height - topPadding - bottomPadding

    const drawGrid = () => {
      ctx.strokeStyle = '#ccc'
      ctx.strokeRect(leftPadding, topPadding, chartWidth, chartHeight)

      const gridLines = 5
      ctx.font = '13px Arial'
      ctx.fillStyle = '#555'
      ctx.textAlign = 'right'

      for (let i = 0; i <= gridLines; i++) {
        const y = topPadding + (chartHeight / gridLines) * i
        const value = niceMax - (niceRange / gridLines) * i

        ctx.strokeStyle = '#e6e6e6'
        ctx.beginPath()
        ctx.moveTo(leftPadding, y)
        ctx.lineTo(leftPadding + chartWidth, y)
        ctx.stroke()

        // ⬇ Label digeser lebih kiri agar tidak nempel garis
        ctx.fillText(formatRupiah(value | 0), leftPadding - labelMargin, y + 5)
      }

      if (niceMin < 0) {
        const zeroY = topPadding + chartHeight * (1 - (0 - niceMin) / niceRange)
        ctx.strokeStyle = '#888'
        ctx.setLineDash([4, 4])
        ctx.beginPath()
        ctx.moveTo(leftPadding, zeroY)
        ctx.lineTo(leftPadding + chartWidth, zeroY)
        ctx.stroke()
        ctx.setLineDash([])
      }
    }

    const drawLines = (progress) => {
      const drawLine = (vals, color) => {
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.beginPath()

        vals.forEach((v, i) => {
          if (i / vals.length > progress) return
          const x = leftPadding + (chartWidth / (vals.length - 1)) * i
          const y = topPadding + chartHeight * (1 - (v - niceMin) / niceRange)
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        })
        ctx.stroke()
      }

      drawLine(data.map(d => d.income), '#28a745')
      drawLine(data.map(d => d.expense), '#dc3545')
      drawLine(data.map(d => d.balance), '#0076FF')
    }

    let progress = 0
    const speed = 0.03

    const animate = () => {
      progress += speed
      if (progress > 1) progress = 1

      ctx.clearRect(0, 0, width, height)

      drawGrid()
      drawLines(progress)

      // Tanggal di bawah
      ctx.font = '11px Arial'
      ctx.fillStyle = '#444'
      ctx.textAlign = 'center'
      data.forEach((d, i) => {
        const x = leftPadding + (chartWidth / (data.length - 1)) * i
        ctx.fillText(d.date, x, height - 10)
      })

      if (progress < 1) requestAnimationFrame(animate)
    }

    animate()
  }, [transactions])

  return (
    <div className="graph-container">
      <h2>Graph</h2>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '300px' }}
      />
      <div className="graph-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ background: '#28a745' }}></span>
          <span>Pemasukan</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ background: '#dc3545' }}></span>
          <span>Pengeluaran</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ background: '#0076FF' }}></span>
          <span>Saldo</span>
        </div>
      </div>
    </div>
  )
}

export default Graph
