import React, { useRef, useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import {
  CheckBoxIcon,
  CheckBoxOutlineBlankIcon,
} from 'components/atoms/IconButton'
import Text from 'components/atoms/Text'
import Flex from 'components/layout/Flex'

export interface CheckBoxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultValue'> {
  /**
   * 表示ラベル
   */
  label?: string
}

// 非表示のチェックリスト
const CheckBoxElement = styled.input`
  display: none;
`
//チェックボックスのラベル
const Label = styled.label`
  cursor: pointer;
  margin-left: 6px;
  user-select: none;
`
/**
 * チェックボックス
 */
const CheckBox = (props: CheckBoxProps) => {
  const { id, label, onChange, checked, ...rest } = props
  const [isChecked, setIsChecked] = useState(checked)

  // ------------------------------------------------------------------------------
  // useRef => 書き換え可能なrefオブジェクトを作成
  // refの使い方 => ①データの保持 ②DOMの参照
  // refオブジェクトに保存された値は更新しても再描画されない => 描画に関係ないデータの保持に利用
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // useCallback => 関数のメモ化(無駄にレンダリングさせない)
  // メモ化コンポーネント + useCallback関数 でないとレンダリングされちゃう
  // ------------------------------------------------------------------------------

  // 隠されたinput要素の参照を保持するためのref (入る要素はinputタグに固定。初期値はnull)
  const ref = useRef<HTMLInputElement>(null)

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      // チェックボックスを強制的にクリック
      ref.current?.click()
      setIsChecked((isChecked) => !isChecked)
    },
    [ref, setIsChecked],
  )

  useEffect(() => {
    // パラメータからの変更を受け付ける
    setIsChecked(checked ?? false)
  }, [checked])

  return (
    <>
      <CheckBoxElement
        {...rest}
        ref={ref}
        type="checkbox"
        checked={isChecked}
        readOnly={!onChange}
        onChange={onChange}
      />
      <Flex alignItems="center">
        {/* チェックボックスのON/OFF によって描画するアイコンを変更 */}
        {checked ?? isChecked ? (
          <CheckBoxIcon size={20} onClick={onClick} />
        ) : (
          <CheckBoxOutlineBlankIcon size={20} onClick={onClick} />
        )}
        {/* チェックボックスのラベル */}
        {label && label.length > 0 && (
          <Label htmlFor="id" onClick={onClick}>
            <Text>{label}</Text>
          </Label>
        )}
      </Flex>
    </>
  )
}

export default CheckBox
