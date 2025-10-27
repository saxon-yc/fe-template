import { createLazyFileRoute } from '@tanstack/react-router'
import { Card } from 'antd'

import MarkdownRender from 'components/markdown'
import readmeContent from '../../../README.md?raw'

function AboutPage() {
  return (
    <div className=''>
      <Card>
        <MarkdownRender>{readmeContent}</MarkdownRender>
      </Card>
    </div>
  )
}

export const Route = createLazyFileRoute('/_auth/about')({
  component: AboutPage,
})
