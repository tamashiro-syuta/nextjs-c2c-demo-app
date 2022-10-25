import { ComponentMeta, ComponentStory } from '@storybook/react'
import CartProduct from '.'

export default {
  title: 'Organisms/CartProduct',
  argTypes: {
    id: {
      control: { type: 'number' },
      describe: '商品 ID',
      table: {
        type: { summary: 'number' },
      },
    },
    title: {
      control: { type: 'text' },
      describe: '商品タイトル',
      table: {
        type: { summary: 'string' },
      },
    },
    imageUrl: {
      control: { type: 'text' },
      describe: '商品画像URL',
      table: {
        type: { summary: 'string' },
      },
    },
    price: {
      control: { type: 'number' },
      describe: '商品価格',
      table: {
        type: { summary: 'number' },
      },
    },
    onBuyButtonClick: {
      describe: '購入ボタンを押したときのイベントハンドラ',
      table: {
        type: { summary: 'function' },
      },
    },
    onRemoveButtonClick: {
      describe: '削除ボタンを押したときのイベントハンドラ',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} as ComponentMeta<typeof CartProduct>

const Template: ComponentStory<typeof CartProduct> = (args) => (
  <CartProduct {...args} />
)

export const NiceShoes = Template.bind({})
NiceShoes.args = {
  id: 1,
  imageUrl: 'images/sample/1.jpg',
  title: 'ナイスシューズ',
  price: 3200,
}
