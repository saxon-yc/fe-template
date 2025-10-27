import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import { Scatter3DChart } from 'echarts-gl/charts'
import { Grid3DComponent } from 'echarts-gl/components'
import { debounce, isEmpty } from 'lodash'
import { useEffect, useRef } from 'react'

interface Props {
  chartOption: EChartsOption
  parentClass: string
  width: string
  height: string
}
export default function Echarts({
  chartOption,
  parentClass,
  width,
  height,
}: Props) {
  echarts.use([Scatter3DChart, Grid3DComponent])
  if (isEmpty(chartOption)) {
    return null
  }

  const chartRef = useRef<HTMLDivElement | null>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  const renderOption = () => {
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current)
    }
    chartInstance?.current?.setOption(chartOption)
    chartInstance?.current?.resize()
  }
  const debouncedResize = debounce(renderOption, 10)

  useEffect(() => {
    const observer = new ResizeObserver(_ => {
      debouncedResize()
    })
    if (chartRef.current) {
      debouncedResize()
      const layout = document.querySelector(parentClass)
      if (layout) {
        observer.observe(layout, {})
      }
    }
    return () => {
      observer.disconnect()
    }
  }, [chartOption])

  return <div ref={chartRef} style={{ width, height }}></div>
}
