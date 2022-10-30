import { render, screen, RenderResult } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import Header from '.'
import { AuthContextProvider } from 'contexts/AuthContext'
import { theme } from 'themes'
import type { User, Product } from 'types'

// ShoppingCartContextのモック(importより後に書くと、importから先に処理されて、useShoppingCartContextが呼ばれる(初期化され、呼び出したくない処理まで呼ばれる)ので、その前にモックを作成することで、初期化されるのを防ぐ、モック(偽物)をimportさせる)
jest.mock('contexts/ShoppingCartContext')
// eslint-disable-next-line import/order
import { useShoppingCartContext } from 'contexts/ShoppingCartContext'
// オリジナルのShoppingCartContextProviderを取得
const { ShoppingCartContextProvider } = jest.requireActual(
  'contexts/ShoppingCartContext',
)

// ダミーユーザー
const authUser: User = {
  id: 1,
  username: 'dummy',
  displayName: 'Taketo Yoshida',
  email: 'test@example.com',
  profileImageUrl: '/images/sample/1.jpg',
  description: '',
}

// ダミー商品
const product: Product = {
  id: 1,
  category: 'book',
  title: 'Product',
  description: '',
  imageUrl: '/images/sample/1.jpg',
  blurDataUrl: '',
  price: 1000,
  condition: 'used',
  owner: authUser,
}

describe('Header', () => {
  let renderResult: RenderResult
  // useShoppingCartContext をモックに差し替え
  const useShoppingCartContextMock =
    useShoppingCartContext as jest.MockedFunction<typeof useShoppingCartContext>

  it('カートに商品が存在する', async () => {
    // mockReturnValue => 返す値をあらかじめ設定できる(この場合、useShoppingCartContextMockが呼ばれたときに、引数に設定したオブジェクトが返る)
    // mockReturnValueで、カートに上で定義したダミー商品を返すことで、カートに商品が存在するようにしてる
    useShoppingCartContextMock.mockReturnValue({
      cart: [product],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      addProductToCart: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      removeProductFromCart: () => {},
    })

    renderResult = render(
      <ThemeProvider theme={theme}>
        <ShoppingCartContextProvider>
          <AuthContextProvider
            authUser={authUser}
            context={{ apiRootUrl: 'https://dummy' }}
          >
            <Header />
          </AuthContextProvider>
        </ShoppingCartContextProvider>
      </ThemeProvider>,
    )

    // カートに入っている（バッジが出てる）
    expect(screen.getAllByTestId('badge-wrapper').length).toBeGreaterThan(0)

    renderResult.unmount()
    useShoppingCartContextMock.mockReset()
  })

  it('未サインイン', async () => {
    // カートを空の状態で返すように設定
    useShoppingCartContextMock.mockReturnValue({
      cart: [],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      addProductToCart: () => {},
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      removeProductFromCart: () => {},
    })

    renderResult = render(
      <ThemeProvider theme={theme}>
        <ShoppingCartContextProvider>
          <AuthContextProvider context={{ apiRootUrl: 'https://dummy' }}>
            <Header />
          </AuthContextProvider>
        </ShoppingCartContextProvider>
      </ThemeProvider>,
    )

    // サインインしていない
    expect(screen.queryByTestId('profile-shape-image')).toBeNull()

    // カートが空
    expect(screen.queryByTestId('badge-wrapper')).toBeNull()

    renderResult.unmount()
    useShoppingCartContextMock.mockReset()
  })
})
