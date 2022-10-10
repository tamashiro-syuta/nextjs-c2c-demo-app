// fetchをラップして使いやすくしている
export const fetcher = async (
  resource: RequestInfo,
  init?: RequestInit,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const res = await fetch(resource, init)

  if (!res.ok) {
    // レスポンス失敗時
    const errorRes = await res.json()
    const error = new Error(
      errorRes.message ?? 'APIリクエスト中にエラー発生しました',
    )
    throw error
  }

  return res.json()
}
