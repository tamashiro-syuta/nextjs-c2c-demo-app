import {
  render,
  act,
  screen,
  fireEvent,
  RenderResult,
} from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import ProductForm from '.'
import { theme } from 'themes'

describe('ProductForm', () => {
  let renderResult: RenderResult
  let handleProductSave: jest.Mock
  // スタブ (代替用品)
  // ↓↓↓ モックとスタブの違い ↓↓↓
  // モック：テスト対象からの出力を受け取るダミー(テストに直接関係のある値)
  // スタブ：テスト対象に都合の良いデータを出力してくれるダミー(直接テストに関係ないけど、固定したい値)

  // フォームの送信についてテストしたいが、その際にURLを指定しる必要がある。フォームの送信に直接影響はないが、テスト条件は対象以外固定したいので、値を定義(これがスタブ)
  // テスト条件 => ここでは、送信時のバリデーション(URLがなんであれバリデーションには関係ないが、固定の値を使いたい。テスト条件の対称性を担保したい)
  // URLは、直接のテスト対象ではないが、テスト対象(フォームのバリデーション)に都合の良いデータを出力してくれるダミーとして値を定義
  global.URL.createObjectURL = () => 'https://test.com'

  beforeEach(() => {
    // ダミー関数
    handleProductSave = jest.fn()
    renderResult = render(
      <ThemeProvider theme={theme}>
        <ProductForm onProductSave={handleProductSave} />
      </ThemeProvider>,
    )
  })

  afterEach(() => {
    renderResult.unmount()
  })

  it('フォーム入力後、onProductSaveが呼ばれる', async () => {
    // DOMが更新される事を保証、React Hook FormのhandleSubmitが呼ばれるまで待つ
    await act(async () => {
      // 商品画像を入力
      const element = await screen.findByTestId('dropzone')
      fireEvent.drop(element, {
        dataTransfer: {
          files: [
            new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
          ],
        },
      })

      // 商品のタイトルを入力
      const inputUsernameNode = screen.getByPlaceholderText(
        /商品のタイトル/,
      ) as HTMLInputElement
      fireEvent.change(inputUsernameNode, { target: { value: '商品' } })

      // 商品情報を入力
      const inputPasswordNode = screen.getByPlaceholderText(
        /最高の商品です/,
      ) as HTMLInputElement
      fireEvent.change(inputPasswordNode, { target: { value: 'テストテスト' } })

      // 価格を入力
      const inputPriceNode = screen.getByPlaceholderText(
        /100/,
      ) as HTMLInputElement
      fireEvent.change(inputPriceNode, { target: { value: '100' } })

      // 出品ボタンをクリック
      fireEvent.click(screen.getByText('出品'))
    })

    // handleProductSaveが呼ばれていることを確認
    expect(handleProductSave).toHaveBeenCalledTimes(1)
  })

  it('商品タイトル入力だけでは、バリデーションエラーでonProductSaveが呼ばれない', async () => {
    // DOMが更新される事を保証、React Hook FormのhandleSubmitが呼ばれるまで待つ
    await act(async () => {
      // 商品のタイトルを入力
      const inputUsernameNode = screen.getByPlaceholderText(
        /商品のタイトル/,
      ) as HTMLInputElement
      fireEvent.change(inputUsernameNode, { target: { value: '商品' } })

      // 出品ボタンをクリック
      fireEvent.click(screen.getByText('出品'))
    })

    // handleProductSaveが呼ばれていないことを確認
    expect(handleProductSave).toHaveBeenCalledTimes(0)
  })
})
