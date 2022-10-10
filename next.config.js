/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: (() => {
    let compilerConfig = {
      // styled-componentsの有効化
      styledComponents: true,
    }

    if (process.env.NODE_ENV === 'production') {
      compilerConfig = {
        ...compilerConfig,
        // 本番環境では、ReactTestingLibraryで使用するdata-testid属性を削除
        reactRemoveProperties: { properties: ['^data-testid$'] },
      }
    }

    return compilerConfig
  })(),
  // オリジン間リソース共有(CORS)をでのCookie送信を避けるために、nextのRewrites機能を使用して、プロキシを設定 (ReWrites機能は、指定したURLパターンを内部で別のURLに変換する機能)
  // nextのエンドポイントにリクエストを送信するとjson-serverのエンドポイントに変換されてリクエストを送信するようにする
  // ex. http://nextjs/api/proxy/siginin → http://signin と変換する
  async rewrites() {
    return [
      {
        // ex. /api/proxy
        source: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:match*`,
        // ex. http://localhost:8000
        destination: `${process.env.API_BASE_URL}/:match*`,
      },
    ]
  },
}

module.exports = nextConfig
