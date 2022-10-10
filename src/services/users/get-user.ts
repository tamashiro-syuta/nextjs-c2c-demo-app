import { ApiContext, User } from 'types/data'
import { fetcher } from 'utils'

export type GetUserParams = {
  id: number
}
/**
 * ユーザーAPI (個別取得)
 * @param context APIコンテキスト
 * @param params パラメータ
 * @returns ユーザー
 */
const getUser = async (
  // APIのルートURL (ルートURLを固定しないのは、`SSGビルドの際のリクエスト` と `クライアントサイドからのリクエスト` を分けるため)
  context: ApiContext,
  { id }: GetUserParams,
): Promise<User> => {
  // サンプルレスポンス
  // {
  //   "id": "1",
  //   "username": "syuta",
  //   "displayName": "tamasyu",
  //   "email": "syuta@example.com",
  //   "profileImageUrl": "/users/1.png",
  //   "description": "this is description"
  // }
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/users/${id}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
}

export default getUser
