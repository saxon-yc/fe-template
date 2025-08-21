import { Helmet } from 'react-helmet-async'

export interface DocumentHeadOptions {
  title?: string
  description?: string
  keywords?: string
  author?: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  customMeta?: Array<{ name?: string; property?: string; content: string }>
  customLinks?: Array<{ rel: string; href: string; [key: string]: string }>
}

/**
 * 动态设置文档头部信息的Hook
 * @param options 头部信息配置选项
 * @returns Helmet组件，需要在组件中渲染
 */
export function useDocumentHead(options: DocumentHeadOptions) {
  const {
    title,
    description,
    keywords,
    author,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    twitterCard = 'summary',
    twitterTitle,
    twitterDescription,
    twitterImage,
    customMeta = [],
    customLinks = [],
  } = options

  // 构建完整的页面标题
  const fullTitle = title ? `${title} - 前端框架模板` : '前端框架模板'

  return (
    <Helmet>
      {/* 基础信息 */}
      <title>{fullTitle}</title>
      {description && <meta name='description' content={description} />}
      {keywords && <meta name='keywords' content={keywords} />}
      {author && <meta name='author' content={author} />}
      {canonical && <link rel='canonical' href={canonical} />}

      {/* Open Graph 标签 */}
      <meta property='og:title' content={ogTitle || fullTitle} />
      {ogDescription && (
        <meta property='og:description' content={ogDescription} />
      )}
      {ogImage && <meta property='og:image' content={ogImage} />}
      {ogUrl && <meta property='og:url' content={ogUrl} />}
      <meta property='og:type' content='website' />

      {/* Twitter Card 标签 */}
      <meta name='twitter:card' content={twitterCard} />
      {twitterTitle && <meta name='twitter:title' content={twitterTitle} />}
      {twitterDescription && (
        <meta name='twitter:description' content={twitterDescription} />
      )}
      {twitterImage && <meta name='twitter:image' content={twitterImage} />}

      {/* 自定义meta标签 */}
      {customMeta.map((meta, index) => {
        if (meta.name) {
          return <meta key={index} name={meta.name} content={meta.content} />
        }
        if (meta.property) {
          return (
            <meta key={index} property={meta.property} content={meta.content} />
          )
        }
        return null
      })}

      {/* 自定义link标签 */}
      {customLinks.map((link, index) => (
        <link key={index} {...link} />
      ))}
    </Helmet>
  )
}

/**
 * 简化版本的文档头部设置Hook
 * @param title 页面标题
 * @param description 页面描述
 * @returns Helmet组件
 */
export function usePageHead(title?: string, description?: string) {
  return useDocumentHead({ title, description })
}

/**
 * 设置SEO相关的头部信息
 * @param options SEO配置选项
 * @returns Helmet组件
 */
export function useSEOHead(options: {
  title: string
  description: string
  keywords?: string
  canonical?: string
  ogImage?: string
}) {
  return useDocumentHead({
    ...options,
    ogTitle: options.title,
    ogDescription: options.description,
    ogUrl: options.canonical || window.location.href,
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: options.ogImage,
  })
}
