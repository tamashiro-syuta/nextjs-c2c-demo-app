import { render, screen, fireEvent, RenderResult } from "@testing-library/react";
import Button from ".";

describe('Button', () => {
  let renderResult: RenderResult
  let handleClick: jest.Mock

  // 各テスト前に行う処理
  beforeEach(() => {
    // ダミー関数を生成(テストしたいのはonClickが効くのか？なので、実際のonClickの処理は行わなくて良いので、ダミーをセット )
    handleClick = jest.fn()
    // Buttonコンポーネントをレンダリング(生成)
    renderResult = render(
      <Button variant="primary" onClick={handleClick}>
        Buttonだよ
      </Button>
    )
  })

  // 各テスト後に行う処理
  afterEach(() => {
    // beforeEachで生成(使える状態に)したボタンをアンマウント(使えない状態)にする
    renderResult.unmount()
  })

  it('ボタンを押した時にonClickが呼ばれる', () => {
    // 『Buttonだよ』と書かれたコンポーネントを取得して、そのコンポーネントをクリック
    fireEvent.click(screen.getByText('Buttonだよ'))
    // ボタンが1回クリックされたかどうかを確認
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
