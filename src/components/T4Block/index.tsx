import React, { useState } from 'react'
import styled from 'styled-components'
import ScaleContainer from '../ScaleContainer'

const T4BlockWrap = styled.div`
  display: grid;
  width: 600px;
  height: 400px;
  padding:14px;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  color: #000;
`

const T4BlockItem = styled.div`
  width: 260px;
  height: 170px;
  background-color: #fff;
  border-radius: 10px;
`

export default function () {
  const [ disabled, setDisabled ] = useState(false)
  return (
    <ScaleContainer width={600} height={400} disabled={disabled}>
      <T4BlockWrap>
        <T4BlockItem onClick={() => setDisabled(flag => !flag)}>目前状态：{ disabled ? '取消监听' : '正在监听' }</T4BlockItem>
        <T4BlockItem>2</T4BlockItem>
        <T4BlockItem>3</T4BlockItem>
        <T4BlockItem>4</T4BlockItem>
      </T4BlockWrap>
    </ScaleContainer>
  )
}
