import React from 'react'
import styled from 'styled-components'

const HomeWrap = styled.div``
const PageHeader = styled.div`
  width: 100%;
  height: 80px;
  border: 1px solid #000;
  box-sizing: border-box;
`

const PageContent = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
`

export default function Home() {
  return (
    <HomeWrap>
      <PageHeader />
      <PageContent />
    </HomeWrap>
  )
}
