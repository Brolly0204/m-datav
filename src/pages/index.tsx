import React from 'react';
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const PagesWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: gainsboro;
`
function Pages() {
  return (
    <PagesWrap>
      <Outlet></Outlet>
    </PagesWrap>
  )
}

export default Pages
