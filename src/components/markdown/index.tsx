import React from 'react'
import { CopyOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Button, Popover, Typography, message } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw' // 让 HTML 标签生效

import './style.css'

// 定义引用数据的接口
interface ReferenceItem {
  content: string
  dataset_id: string
  document_id: string
  doc_name: string
  id: string
  image_id: string
}
const CommonStyle = {
  letterSpacing: 'normal',
  fontSize: '16px',
}
// 新增的公共方法
const processChildren = (
  children: any,
  props: any,
  processText: (text: string) => any,
  TagName: React.ElementType = 'p'
) => {
  if (Array.isArray(children)) {
    return (
      <TagName {...props}>
        {children.map((child, index) => {
          if (typeof child === 'string') {
            return (
              <React.Fragment key={index}>
                {processText(child) || ''}
              </React.Fragment>
            )
          }
          return <React.Fragment key={index}>{child || ''}</React.Fragment>
        })}
      </TagName>
    )
  }
  if (typeof children === 'object') {
    return (
      <TagName {...props}>
        <React.Fragment>{children || ''}</React.Fragment>
      </TagName>
    )
  }
  return <TagName {...props}>{processText(String(children || ''))}</TagName>
}

interface MarkdownProps {
  children: any
  reference?: ReferenceItem[]
  net_search?: []
}

export default function MarkdownRender(props: MarkdownProps) {
  const { children, reference = [], net_search = [] } = props
  const [messageApi, contextHolder] = message.useMessage()

  const handleCopySuccess = () => {
    messageApi.success('复制成功')
  }
  const handle2site = (url: string) => {
    window.open(url, '_blank')
  }

  // 统一处理文本中的 ##数字^^ 和 ##数字$$
  const processText = (text: string): React.ReactNode[] => {
    const regex = /##(\d+)(\^\^|\$\$)/g
    const parts: React.ReactNode[] = []
    let lastIndex = 0
    let match

    while ((match = regex.exec(text)) !== null) {
      const start = match.index
      const end = start + match[0].length
      const num = parseInt(match[1], 10)
      const symbol = match[2]

      // 添加前面的文本
      if (start > lastIndex) {
        parts.push(text.substring(lastIndex, start))
      }

      // 处理匹配项
      if (symbol === '^^') {
        // 处理网络链接
        const netItem: Record<string, any> =
          net_search.find((item: any) => item.id === num) || {}
        if (netItem) {
          if (netItem?.content) {
            parts.push(
              <Popover
                key={`net-${start}`}
                arrow={false}
                content={
                  <div
                    style={{ maxWidth: 600, cursor: 'pointer' }}
                    onClick={() => handle2site(netItem?.url)}
                  >
                    <Typography.Paragraph
                      ellipsis={{ rows: 3 }}
                      type='secondary'
                    >
                      {netItem?.content}
                    </Typography.Paragraph>
                  </div>
                }
                title={netItem?.title}
              >
                <div
                  className='site-link'
                  onClick={() => handle2site(netItem?.url)}
                >
                  {netItem?.id}
                </div>
              </Popover>
            )
          }
        } else {
          parts.push(match[0])
        }
      } else if (symbol === '$$') {
        // 处理文献引用
        const refItem = reference[num]
        if (refItem) {
          parts.push(
            <Popover
              key={`ref-${start}`}
              arrow={false}
              content={
                <div style={{ maxWidth: 600 }}>
                  <p>{refItem.content}</p>
                  <p>
                    <strong>文档:</strong>
                    <Typography.Text type='secondary'>
                      {refItem.doc_name}
                    </Typography.Text>
                  </p>
                </div>
              }
              title='引用信息'
            >
              <a>
                <InfoCircleOutlined />
              </a>
            </Popover>
          )
        } else {
          parts.push(match[0])
        }
      } else {
        parts.push(match[0])
      }

      lastIndex = end
    }

    // 添加剩余文本
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return parts
  }

  return (
    <>
      {contextHolder}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // 处理代码块
          code({
            node,
            inline,
            className,
            children,
            ...props
          }: Record<string, any>) {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''
            return !inline ? (
              <>
                {language ? (
                  <div className='code-block-container'>
                    <div className='code-block-header'>
                      <span className='code-language'>{language}</span>
                      <CopyToClipboard
                        text={String(children).replace(/\n$/, '')}
                        onCopy={handleCopySuccess}
                      >
                        <Button
                          type='text'
                          size='small'
                          icon={<CopyOutlined />}
                          className='copy-button'
                        />
                      </CopyToClipboard>
                    </div>
                    <SyntaxHighlighter
                      style={
                        vscDarkPlus as { [key: string]: React.CSSProperties }
                      }
                      language={language}
                      PreTag='div'
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        padding: '0px 2px',
                        borderRadius: '2px',
                        display: 'inline-block',
                      }}
                    >
                      {String(children).replace(/\n$/, '')}
                    </div>
                  </>
                )}
              </>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          p({ node, children, ...props }) {
            return processChildren(
              children,
              { ...props, style: { ...CommonStyle } },
              processText,
              'p'
            )
          },

          ol({ node, children, ...props }) {
            return processChildren(
              children,
              { ...props, style: { paddingLeft: 24, ...CommonStyle } },
              processText,
              'ol'
            )
          },

          ul({ node, children, ...props }) {
            return processChildren(
              children,
              { ...props, style: { paddingLeft: 24, ...CommonStyle } },
              processText,
              'ul'
            )
          },

          li({ node, children, ...props }) {
            return processChildren(
              children,
              { ...props, style: { lineHeight: '30px', ...CommonStyle } },
              processText,
              'li'
            )
          },

          h1({ node, children, ...props }) {
            return processChildren(
              children,
              { ...props, style: { letterSpacing: 'normal' } },
              processText,
              'h1'
            )
          },
          h2({ node, children, ...props }) {
            return processChildren(
              children,
              { ...props, style: { letterSpacing: 'normal' } },
              processText,
              'h2'
            )
          },
          h3({ node, children, ...props }) {
            return processChildren(
              children,
              { ...props, style: { letterSpacing: 'normal' } },
              processText,
              'h3'
            )
          },
          h4({ node, children, ...props }) {
            return processChildren(
              children,
              { ...props, style: { letterSpacing: 'normal' } },
              processText,
              'h4'
            )
          },
          h5({ node, children, ...props }) {
            return processChildren(
              children,
              { ...props, style: { letterSpacing: 'normal' } },
              processText,
              'h5'
            )
          },
          h6({ node, children, ...props }) {
            return processChildren(
              children,
              { ...props, style: { letterSpacing: 'normal' } },
              processText,
              'h6'
            )
          },
          em({ node, children, ...props }) {
            return processChildren(
              children,
              { ...props, style: { ...CommonStyle } },
              processText,
              'em'
            )
          },
          strong({ node, children, ...props }) {
            return processChildren(
              children,
              { ...props, style: { ...CommonStyle } },
              processText,
              'strong'
            )
          },
          a({ node, children, ...props }) {
            return processChildren(
              children,
              { ...props, style: { ...CommonStyle } },
              processText,
              'a'
            )
          },
          text({ children }) {
            return processText(String(children))
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </>
  )
}
