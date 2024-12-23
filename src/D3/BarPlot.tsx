import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

interface BarPlotProps {
  data: { month: string, count: number }[]
}

export default function BarPlot({ data }: BarPlotProps) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!svgRef.current || !wrapperRef.current) return

    const svg = d3.select(svgRef.current)
    const wrapper = wrapperRef.current
    
    const margin = { top: 20, right: 30, bottom: 30, left: 40 }
    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = wrapper.getBoundingClientRect()
      updateChart(width, height)
    })

    resizeObserver.observe(wrapper)

    function updateChart(width: number, height: number) {
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

      svg.selectAll('*').remove()

      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style('font-size', '14px')

      g.append('g')
        .call(d3.axisLeft(y))
        .selectAll('text')
        .style('font-size', '14px')

      const customColors = ['#ff5252', '#ff4081', '#e040fb', '#7c4dff', '#536dfe', '#448aff', '#18ffff', '#64ffda', '#69f0ae', '#b2ff59','#FFD700', '#C0C0C0']

      g.selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', (d) => x(d.month) || 0)
        .attr('y', (d) => y(d.count))
        .attr('width', x.bandwidth())
        .attr('height', (d) => innerHeight - (y(d.count) || 0))
        .attr('fill', (d, i) => customColors[i % customColors.length])
    }

    return () => resizeObserver.unobserve(wrapper)
  }, [data])

  return (
    <div ref={wrapperRef} style={{ width: '100%', height: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
