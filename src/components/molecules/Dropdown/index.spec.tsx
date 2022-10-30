import { ThemeProvider } from "styled-components";
import {
  render,
  screen,
  act,
  fireEvent,
  RenderResult,
} from '@testing-library/react'
import { theme } from "themes";
import Dropdown from ".";

describe('Dropdown', () => {
  let renderResult: RenderResult
  let handleChange: jest.Mock

  // 各テスト前に行う処理
  beforeEach(() => {
    // ダミー関数を生成(テストしたいのはonClickが効くのか？なので、実際のonClickの処理は行わなくて良いので、ダミーをセット )
    handleChange = jest.fn()
    // コンポーネントをレンダリング(生成)
    renderResult = render(
      // themeを使ってスタイリングしているので、ThemeProviderで囲ってあげないとエラーになる
      <ThemeProvider theme={theme}>
        <Dropdown
          options={[
            { value: 'used', label: '中古' },
            { value: 'new', label: '新品' },
          ]}
          onChange={handleChange}
        />
      </ThemeProvider>
    )
  })

  // 各テスト後に行う処理
  afterEach(() => {
    // beforeEachで生成(使える状態に)したコンポーネントをアンマウント(使えない状態)にする
    renderResult.unmount()
  })

  it('ファイルをがドロップされた時にonDropが呼ばれる', async () => {
    // act関数で囲むことでレンダー、ユーザーイベント、データの取得といったタスクによる更新が全て処理され、(プルダウンを開いているように)DOMが更新されたことを保証する
    await act(async () => {
      // テストIDから要素を取得
      const element = await screen.findByTestId('dropdown-control')
      // クリックして、オプションのプルダウンを開く
      element && fireEvent.mouseDown(element)
    })

    // プルダウンから最初のオプションを選択
    const elements = await screen.getAllByTestId('dropdown-option')
    elements && fireEvent.click(elements[0])

    // オプションを選択したか確認
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
