import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { theme } from 'themes'

const GlobalStyles = createGlobalStyle`
  html,
  body,
  textarea {
    padding: 0;
    margin: 0;
    font-family: -apple-system,Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fria Sans, Driod Sans, Helvetica Neue, sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  a {
    corsor: pointer;
    text-decoration: none;
    transition: .25s;
    color: #000;
  }

  ol, ul {
    list-style: none;
  }
`

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        {/* HeadタグのデータがWebクローラーに内容を伝え、SEOの向上に繋がる */}
        <title>サイトのタイトルとして使われる（検索した時に出るやつ）</title>
        <meta
          name="description"
          content="サイトの説明に使われる（検索した際にタイトルの下に小文字で出るやつ）"
        />

        {/* property → 「og:~~」は、OGP(Open Graph Protocol)のメタデータを定義(SNSなどでシェアする際のサムネの内容など) */}
        <meta property="og:title" content="タイトルを指定" />
        <meta property="og:description" content="ページの説明文を指定" />
        <meta property="og:site_name" content="ページのサイト名を指定" />
        <meta property="og:image" content="サムネの画像を指定" />
        <meta property="og:url" content="ページのURLを指定" />
        <meta
          property="og:type"
          content="オブジェクトのタイプ（webpage,article,videoなど）を指定（指定したタイプによって追加のメタデータが必要な場合もある）"
        />

        <meta key="charset" name="charset" content="utf-8" />
        <meta
          key="viewport"
          name="viewport"
          content="width = device-width, initial-scale = 1, shrink-to-fit = no, maximum-scale = 5"
        />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:type" content="website" />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
