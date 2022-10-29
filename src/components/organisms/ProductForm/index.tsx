import { Controller, useForm } from 'react-hook-form'
import Button from 'components/atoms/Button'
import Input from 'components/atoms/Input'
import Text from 'components/atoms/Text'
import TextArea from 'components/atoms/TextArea'
import Box from 'components/layout/Box'
import Dropdown from 'components/molecules/Dropdown'
import InputImages, { FileData } from 'components/molecules/InputImages'
import type { Category, Condition } from 'types'

export type ProductFormData = {
  image: FileData[]
  title: string
  description: string
  category: Category
  condition: Condition
  price: string
}

interface ProductFormProps {
  /**
   * 出品ボタンを押した時のイベントハンドラ
   */
  onProductSave?: (data: ProductFormData) => void
}

/**
 * 商品投稿フォーム
 */
const ProductForm = ({ onProductSave }: ProductFormProps) => {
  // React Hook Formの使用(registerとhandleSubmitは必須)
  const {
    // register関数に引数を指定することでname(属性), ref, onBlur, onChangeが戻される(詳しくはタイトルの箇所で説明してる)
    register,
    handleSubmit,
    // コンポーネントを React Hook Form に登録するためのメソッドが含まれている(内部利用のみなので、controlの中身を直接参照するのはダメ)
    control,
    // フォームの状態全体に関する情報を含んでいる。フォームアプリケーションとユーザーのインタラクションを追跡するのに役立ちます。
    // 詳しくは →→→ https://react-hook-form.com/api/useform/formstate
    formState: { errors },
  } = useForm<ProductFormData>()
  // ProductFormの引数のメソッド(onProductSave)をフォームのデータに対して行う
  const onSubmit = (data: ProductFormData) => {
    onProductSave && onProductSave(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box marginBottom={3}>
        <Box marginBottom={2}>
          <Text as="label" variant="mediumLarge" fontWeight="bold">
            商品の写真
          </Text>
        </Box>
        {/* 商品画像の入力 */}
        <Controller
          control={control}
          name="image"
          // 必須項目に設定
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputImages
              images={value ?? []}
              onChange={onChange}
              maximumNumber={1}
              hasError={!!error}
            />
          )}
        />
        {errors.image && (
          <Text color="danger" variant="small" paddingLeft={1}>
            Product image is required
          </Text>
        )}
      </Box>

      <Box marginBottom={3}>
        <Box marginBottom={2}>
          <Text as="label" variant="mediumLarge" fontWeight="bold">
            商品情報
          </Text>
        </Box>
        <Box marginBottom={1}>
          <Text as="label" variant="medium">
            タイトル
          </Text>
          {/* 商品タイトルの入力 */}
          <Input
            // register関数に引数を指定することでname(属性), ref, onBlur, onChangeが戻される
            // 入力を行えばonChangeイベント、input要素からカーソルを外したらonBlurイベントが発火
            // nameはinput要素のname属性に設定
            // refはReact Hook Formからinput要素への参照としてアクセスする際に利用
            // https://react-hook-form.com/api/useform/register
            {...register('title', { required: true })}
            type="text"
            placeholder="商品のタイトル"
            hasError={!!errors.title}
            onChange={() => {
              console.log('control')
              console.log(control)
            }}
          />
          {/* 上のregisterにtitleを定義しているので、errors.titleでエラーを取得できる */}
          {errors.title && (
            <Text color="danger" variant="small" paddingLeft={1}>
              タイトルの入力は必須です
            </Text>
          )}
        </Box>
        <Box marginBottom={1}>
          <Text as="label" variant="medium">
            概要
          </Text>
          {/* 商品概要の入力 */}
          <Controller
            control={control}
            name="description"
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextArea
                placeholder="最高の商品です！"
                hasError={!!error}
                onChange={onChange}
              >
                {value}
              </TextArea>
            )}
          />
          {errors.description && (
            <Text color="danger" variant="small" paddingLeft={1}>
              概要の入力は必須です
            </Text>
          )}
        </Box>
        <Box marginBottom={1}>
          <Text as="label" variant="medium">
            カテゴリ
          </Text>
          {/* カテゴリのドロップダウン */}
          <Controller
            control={control}
            name="category"
            rules={{ required: true }}
            defaultValue="shoes"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Dropdown
                options={[
                  { value: 'shoes', label: 'シューズ' },
                  { value: 'clothes', label: 'トップス' },
                  { value: 'book', label: '本' },
                ]}
                hasError={!!error}
                value={value}
                placeholder="カテゴリを選択して下さい"
                onChange={(v) => onChange(v?.value)}
              />
            )}
          />
          {errors.category && (
            <Text color="danger" variant="small" paddingLeft={1}>
              カテゴリの選択は必須です
            </Text>
          )}
        </Box>
        <Box marginBottom={1}>
          <Text as="label" variant="medium">
            商品の状態
          </Text>
          {/* 商品の状態のドロップダウン */}
          <Controller
            control={control}
            name="condition"
            rules={{ required: true }}
            defaultValue="used"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Dropdown
                options={[
                  { value: 'used', label: '中古' },
                  { value: 'new', label: '新品' },
                ]}
                hasError={!!error}
                value={value ?? 'used'}
                placeholder="Please select condition"
                onChange={(v) => onChange(v?.value)}
              />
            )}
          />
          {errors.condition && (
            <Text color="danger" variant="small" paddingLeft={1}>
              商品の状態の入力は必須です
            </Text>
          )}
        </Box>
        <Box>
          <Text as="label" variant="medium">
            価格 (円)
          </Text>
          {/* 価格の入力 */}
          <Input
            {...register('price', { required: true })}
            name="price"
            type="number"
            placeholder="100"
            hasError={!!errors.price}
          />
          {errors.price && (
            <Text color="danger" variant="small" paddingLeft={1}>
              価格の入力は必須です
            </Text>
          )}
        </Box>
      </Box>
      <Button width="100%" type="submit">
        出品
      </Button>
    </form>
  )
}

export default ProductForm
