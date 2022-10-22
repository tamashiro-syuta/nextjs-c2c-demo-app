import { ComponentMeta, ComponentStory } from '@storybook/react'
import React, { useState } from 'react'
import CheckBox from '.'
import Box from 'components/layout/Box'

export default {
  title: 'Molecules/CheckBox',
  argTypes: {
    // ChackBoxの引数であるlabelの設定
    label: {
      // controlsのlabelの型を決めている(textなら文字列、numberなら数字になる)
      // プロパティを編集するコントロールのための追加情報
      control: { type: 'text' },
      description: 'ラベル',
      // ラベルがレンダリングされる方法をカスタマイズするための追加情報を提供
      table: {
        type: { summary: 'text' },
      },
    },
    checked: {
      control: { type: 'boolean' },
      description: 'チェック',
      table: {
        type: { summary: 'number' },
      },
    },
    onChange: {
      description: '値が変化した時のイベントハンドラ',
      table: {
        type: { summary: 'function' },
      },
    },
  },
} as ComponentMeta<typeof CheckBox>

const Template: ComponentStory<typeof CheckBox> = (args) => (
  <CheckBox {...args} />
)

export const WithLabel = Template.bind({})
WithLabel.args = { label: 'Label' }

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {}
