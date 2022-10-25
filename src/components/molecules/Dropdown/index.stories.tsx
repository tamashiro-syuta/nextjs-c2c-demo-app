import { ComponentMeta, ComponentStory } from '@storybook/react'
import React, { useState } from 'react'
import Dropdown from '.'

export default {
  title: 'Molecules/Dropdown',
  argTypes: {
    // Dropdownの引数であるlabelの設定
    options: {
      // controlsのoptionsの型を決めている(textなら文字列、numberなら数字になる)
      // プロパティを編集するコントロールのための追加情報
      control: { type: 'array' },
      description: 'ドロップダウンの選択肢',
      // オプションズがレンダリングされる方法をカスタマイズするための追加情報を提供
      table: {
        type: { summary: 'array' },
      },
    },
    hasError: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'バリデーションエラーフラグ',
      table: {
        type: { summary: 'boolean' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'プレースホルダー',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: { type: 'text' },
      description: 'ドロップダウンの値',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      description: '値が変化した時のイベントハンドラ',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} as ComponentMeta<typeof Dropdown>

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
)

export const Normal = Template.bind({})
Normal.args = {
  options: [
    { value: null, label: '-' },
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
    { value: 'three', label: 'Three' },
  ],
  placeholder: 'Please select items from the list',
}

// 初期値を設定
export const initialItem = Template.bind({})
initialItem.args = {
  options: [
    { value: null, label: '-' },
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
    { value: 'three', label: 'Three' },
  ],
  placeholder: 'Please select items from the list',
  value: 'one',
}

//多くの要素を表示
export const Many = Template.bind({})
Many.args = {
  options: Array.from(Array(20), (_v, k) => {
    return {
      value: k.toString(),
      label: k.toString(),
    }
  }),
  placeholder: 'Please select items from the list',
}
