import React, { useRef, useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import Text from 'components/atoms/Text'
import Flex from 'components/layout/Flex'

const DropdownRoot = styled.div`
  position: relative;
  height: 38px;
`
// ドロップボックスの外観
const DropdownControl = styled.div<{ hasEroor?: boolean }>`
  position: relative;
  overflow: hidden;
  background-color: #ffffff;
  border: ${({ theme, hasEroor }) =>
    hasEroor
      ? `1px solid ${theme.colors.denger}`
      : `1px solid ${theme.colors.denger}`};
  border-radius: 5px;
  cursur: default;
  outline: none;
  padding: 8px 52px 8px 12px;
`
const DropdownValue = styled.div`
  color: ${({ theme }) => theme.colors.text};
`
// ドロップダウンプレースホルダー
const DropdownPlaceholder = styled.div`
  color: #757575;
  font-size: ${({ theme }) => theme.fontSizes[1]};
  min-height: 20px;
  line-height: 20px;
`

// ドロップダウンの矢印の外観
const DropdownArrow = styled.div<{ isOpen?: boolean }>`
  border-color: ${({ isOpen }) =>
    isOpen
      ? 'transparent transparent #222222;'
      : '#222222 transparent transparent'};
  border-width: ${({ isOpen }) => (isOpen ? '0 5px 5px' : '5px 5px 0;')};
  border-style: solid;
  content: ' ';
  display: block;
  height: 0;
  margin-top: -ceil(2.5);
  position: absolute;
  right: 10px;
  top: 16px;
  width: 0;
`

const DropdownMenu = styled.div`
  background-color: #ffffff;
  border: ${({ theme }) => theme.colors.border};
  box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
    0px 8px 10px 1px rgb(0 0 0 / 10%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: -1px;
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1000;
`

const DropdownOption = styled.div`
  padding: 8px 12px 8px 12px;
  &:hover {
    background-color: #f9f9f9;
  }
`

interface DropdownItemProps {
  item: DropdownItem
}

/**
 * ドロップダウンの選択した要素
 */
const DropdownItem = (props: DropdownItemProps) => {
  const { item } = props

  return (
    <Flex alignItems="center">
      <Text margin={0} variant="small">
        {item.label ?? item.value}
      </Text>
    </Flex>
  )
}

export interface DropdownItem {
  value: string | number | null
  label?: string
}

interface DropdownProps {
  // ドロップダウンの選択肢
  options: DropdownItem[]
  // ドロップダウンの値
  value?: string | number
  //<input /> のname属
  name?: string
  // プレースホルダー
  placeholder?: string
  // バリデーションのエラーフラグ
  hasError?: boolean
  // 値が変化した時のイベントハンドラ
  onChange?: (selected?: DropdownItem) => void
}

/**
 * ドロップダウン
 */
const Dropdown = (props: DropdownProps) => {
  const { onChange, name, options, hasError } = props
  const initialItem = options.find((i) => i.value === props.value)
  const [isOpen, setIsOpenValue] = useState(false)
  const [selectedItem, setSelectedItem] = useState(initialItem)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // useCallbackでクリック時の関数をメモ化
  const handleDocumentClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      //自分自身をクリックした場合は、何もしない
      if (dropdownRef.current) {
        const elems = dropdownRef.current.querySelectorAll('*')

        for (let i = 0; i < elems.length; i++) {
          if (elems[i] == e.target) return
        }
      }
      setIsOpenValue(false)
    },
    [dropdownRef],
  )

  // マウスダウンした時にドロップダウンを開く
  const handleMouseDown = (e: React.SyntheticEvent) => {
    setIsOpenValue((isOpen) => !isOpen)
    e.stopPropagation()
  }

  // ドロップダウンから選択した時
  const handleSelectValue = (
    e: React.FormEvent<HTMLDivElement>,
    item: DropdownItem,
  ) => {
    e.stopPropagation()

    // アイテムを選択
    setSelectedItem(item)
    // 閉じる
    setIsOpenValue(false)
    // onChangeがあれば、実行
    onChange && onChange(item)
  }

  useEffect(() => {
    // 画面外のクリックとタッチイベントを設定
    document.addEventListener('click', handleDocumentClick, false)
    document.addEventListener('touchend', handleDocumentClick, false)

    return function cleanup() {
      document.removeEventListener('click', handleDocumentClick, false)
      document.removeEventListener('touchend', handleDocumentClick, false)
    }

    // 最初だけ呼び出す
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DropdownRoot ref={dropdownRef}>
      <DropdownControl
        hasEroor={hasError}
        onMouseDown={handleMouseDown}
        onTouchEnd={handleMouseDown}
        data-testid="dropdown-control"
      >
        {/* アイテムが選択されている時は、それを表示 */}
        {selectedItem && (
          <DropdownValue>
            <DropdownItem item={selectedItem} />
          </DropdownValue>
        )}
        {/* 選択されていない時は、プレースホルダーを表示 */}
        {!selectedItem && (
          <DropdownPlaceholder>{props.placeholder}</DropdownPlaceholder>
        )}
        {/* ダミー input */}
        <input
          type="hidden"
          name={name}
          value={selectedItem?.value ?? ''}
          onChange={() => onChange && onChange(selectedItem)}
        />
        <DropdownArrow isOpen={isOpen} />
      </DropdownControl>
      {/* ドロップダウンを表示 */}
      {isOpen && (
        <DropdownMenu>
          {props.options.map((item, idx) => (
            <DropdownOption
              key={idx}
              onMouseDown={(e) => handleSelectValue(e, item)}
              onClick={(e) => handleSelectValue(e, item)}
              data-testid="dropdown-option"
            >
              <DropdownItem item={item} />
            </DropdownOption>
          ))}
        </DropdownMenu>
      )}
    </DropdownRoot>
  )
}

export default Dropdown
