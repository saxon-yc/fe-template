import { createFileRoute } from '@tanstack/react-router'
import type { EChartsOption } from 'echarts'
import { Card, Col, Row } from 'antd'

import Echarts from '@/components/echarts'

function HomePage() {
  const chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      },
    ],
  }
  return (
    <Row gutter={[10, 10]} className='w-full'>
      <Col xs={24} sm={12} md={8} lg={6} xl={6}>
        <Card title='图表示例'>
          <div className='chart-category w-full h-[300px]'>
            <Echarts
              chartOption={chartOption}
              parentClass='.chart-category'
              width='100%'
              height='100%'
            />
          </div>
        </Card>
      </Col>
    </Row>
  )
}

export const Route = createFileRoute('/_auth/')({
  component: HomePage,
})
