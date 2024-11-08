import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

interface BarPlotProps {
  data: { month: string, count: number }[]
  width?: number
  height?: number
}

export default function BarPlot({ data, width = 640, height = 400 }: BarPlotProps) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const margin = { top: 20, right: 30, bottom: 30, left: 40 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.month))
      .range([0, innerWidth])
      .padding(0.1)

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count) || 0])
      .range([innerHeight, 0])

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))

    g.append('g').call(d3.axisLeft(y))

    g.selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d) => x(d.month) || 0)
      .attr('y', (d) => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', (d) => innerHeight - (y(d.count) || 0))
      .attr('fill', 'steelblue')
  }, [data, width, height])

  return <svg ref={svgRef} width={width} height={height} />
}
