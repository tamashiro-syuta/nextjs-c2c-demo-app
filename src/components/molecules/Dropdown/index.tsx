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
  font-size: ${({ theme }) => theme.fontSize[1]};
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

const DropdownItem = (props: DropdownItemProps) => {
  const { item } = props

  return <Flex alignItems="center">{/* 続きここから */}</Flex>
}
