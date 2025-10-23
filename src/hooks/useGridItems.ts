import { useCallback, useEffect, useRef, useState } from 'react'

interface GridConfig {
  itemMinWidth: number // 每个盒子的最小宽度
  gap: number // 网格间距
  defaultColumns: number // 默认列数
}

interface UseGridItemsReturn {
  containerRef: React.RefObject<HTMLDivElement | null>
  gridItems: any[]
  setGridItems: React.Dispatch<React.SetStateAction<any[]>>
  columns: number
  gridStyle: React.CSSProperties
  itemWidth: number // 每个grid item的实际宽度
}

export default function useGridItems(
  items: any[],
  config: GridConfig = {
    itemMinWidth: 150, // 每个盒子最小宽度150px
    gap: 16, // 16px间距
    defaultColumns: 8, // 默认8列
  }
): UseGridItemsReturn {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [gridItems, setGridItems] = useState<any[]>(items)
  const [columns, setColumns] = useState<number>(config.defaultColumns)
  const [itemWidth, setItemWidth] = useState<number>(config.itemMinWidth)

  // 计算自适应列数和item宽度
  const calculateLayout = useCallback(() => {
    if (!containerRef.current) {
      return {
        columns: config.defaultColumns,
        itemWidth: config.itemMinWidth,
      }
    }

    const containerWidth = containerRef.current.offsetWidth
    if (containerWidth === 0) {
      return {
        columns: config.defaultColumns,
        itemWidth: config.itemMinWidth,
      }
    }

    // 计算可容纳的列数：(容器宽度 + 间距) / (最小宽度 + 间距)
    const availableWidth = containerWidth + config.gap
    const itemWithGap = config.itemMinWidth + config.gap
    const calculatedColumns = Math.floor(availableWidth / itemWithGap)

    // 确保至少有1列，最多不超过默认列数
    const finalColumns = Math.max(
      1,
      Math.min(calculatedColumns, config.defaultColumns)
    )

    // 计算每个item的实际宽度：(容器宽度 - (列数-1) * 间距) / 列数
    const actualItemWidth =
      finalColumns > 0
        ? (containerWidth - (finalColumns - 1) * config.gap) / finalColumns
        : config.itemMinWidth

    return {
      columns: finalColumns,
      itemWidth: Math.max(actualItemWidth, config.itemMinWidth),
    }
  }, [config.itemMinWidth, config.gap, config.defaultColumns])

  // 监听窗口大小变化
  useEffect(() => {
    const updateLayout = () => {
      const layout = calculateLayout()
      setColumns(layout.columns)
      setItemWidth(layout.itemWidth)
    }

    // 初始计算
    updateLayout()

    // 监听窗口变化
    const handleResize = () => {
      requestAnimationFrame(updateLayout)
    }

    window.addEventListener('resize', handleResize)

    // 使用ResizeObserver监听容器大小变化（如果支持）
    let resizeObserver: ResizeObserver | null = null
    if (window.ResizeObserver && containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(updateLayout)
      })
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeObserver && containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [calculateLayout])

  // 更新 items 时同步更新 gridItems
  useEffect(() => {
    setGridItems(items)
  }, [items])

  // 生成网格样式
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${config.gap}px`,
    width: '100%',
  }

  return {
    containerRef,
    gridItems,
    columns,
    gridStyle,
    setGridItems,
    itemWidth,
  }
}
