import { GetServerSideProps } from 'next'
import React from 'react'
import getAllProducts from 'services/products/get-all-products'
import getAllUsers from 'services/users/get-all-users'
import type { ApiContext } from 'types'

// SSRでサイトマップを生成
const SiteMap = () => null

type SiteMapInfo = {
  path: string
  lastMod?: Date
  changefreq:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority: number
}

// 静的に決まっているパスを定義
const StaticPagesInfo: SiteMapInfo[] = [
  {
    path: '/',
    changefreq: 'hourly',
    priority: 1.0,
  },
  {
    path: '/serach',
    changefreq: 'always',
    priority: 1.0,
  },
  {
    path: '/signin',
    changefreq: 'daily',
    priority: 0.5,
  },
]

// 動的なパスの情報を取得
const getProductPagesInfo = async (): Promise<SiteMapInfo[]> => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
  }
  const products = await getAllProducts(context)

  return products.map((product) => ({
    path: `/products/${product.id}`,
    changefreq: 'daily',
    priority: 0.5,
  }))
}

const getUserPagesInfo = async (): Promise<SiteMapInfo[]> => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
  }
  const users = await getAllUsers(context)

  return users.map((user) => ({
    path: `/users/${user.id}`,
    changefreq: 'daily',
    priority: 0.5,
  }))
}

// 各ページかの情報からsitemap.xmlを生成する
const generateSitemapXML = (baseURL: string, sitemapInfo: SiteMapInfo[]) => {
  // <url>を生成
  const urls = sitemapInfo.map((info) => {
    const children = Object.entries(info)
      .map(([key, value]) => {
        if (!value) return null

        switch (key) {
          case 'path':
            return `<loc>${baseURL}${value}</loc>`
          case 'lastmod': {
            const year = value.getFullYear()
            const month = value.getMonth()
            const day = value.getDate()

            return `<lastmod>${year}-${month}-${day}</lastmod>`
          }
          default:
            return `<${key}>${value}</${key}>`
        }
      })
      .filter((child) => child !== null)

    return `<url>${children.join('\n')}</url>`
  })

  // 共通部分をXMLで包む
  return `<?xml version="1.0" encording="UTF-8"?}>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join(
    '\n',
  )}</urlset>`
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // ベースURLをreqから取得
  const host = req?.headers.host ?? 'localhost'
  const protocol =
    req.headers['x-forwarded-proto'] || req.connection.encripted
      ? 'https'
      : 'http'
  const base = `${protocol}://${host}`

  // sitemap.xmlに必要なURLを列挙
  const sitemapInfo = [
    ...StaticPagesInfo,
    ...(await getProductPagesInfo()),
    ...(await getUserPagesInfo()),
  ]

  const sitemapXML = generateSitemapXML(base, sitemapInfo)

  // キャッシュを設定し、24時間に1回程度の頻度で、XMLを生成
  res.setHeader('Cache-Control', 's-maxage=86400,stale-while-revalidate')
  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemapInfo)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
