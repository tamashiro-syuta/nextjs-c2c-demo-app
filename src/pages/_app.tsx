import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'

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
    <>
      <Head>
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
    </>
  )
}

export default MyApp
