import FlopNum from '@/components/FlopNum'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import T1Block from "@/components/T1Block"
import T4Block from "@/components/T4Block"
import { CountTo, useCountTo } from "@/components/CountTo";

const HomeWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: #fff;
`

const HomeWrapImg = styled.img`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`

const HeaderImg = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1;
`

const ImgTop = styled.div`
  position: relative;
  z-index: 2;
`

const Loading = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, .4);
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`

const PageHeader = styled.div`
  width: 100%;
  height: 80px;
  border: 1px solid #000;
  box-sizing: border-box;
  padding-top: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color: #fff;
  font-size: 30px;
`

const PageContent = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  display: grid;
  grid-template-areas: 
  "number number number"
  "t1 t2 t3"
  "t4 t4 t5"
  ;
  grid-template-columns: 200fr 500fr 200fr;
  grid-template-rows: 50px 1fr 1fr;
  grid-gap: 24px;
  padding: 24px;
  box-sizing: border-box;
`

const NumberBlock = styled.div`
  grid-area: number;
  border: 1px solid hotpink;
  display: flex;
  align-items: center;
`
const AreaBase = styled.div<{areaName: string}>`
  grid-area: ${({ areaName })=> areaName};
  border: 1px solid hotpink;
  overflow: hidden;
`

export default function Home() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const imgs = document.querySelectorAll('img')
    if (!imgs.length) {
      setLoading(false)
      return
    }
    let imgLen = imgs.length
    ;[].forEach.call(imgs, (img: HTMLImageElement) => {
      img.addEventListener('load', () => {
        imgLen--
        if (imgLen === 0) {
          setLoading(false)
        }
      })
    })
  }, [])
  const [numberValue, setNumberValue] = useState(3214568970)
  const handleChangeNum = () => {
    setNumberValue(Date.now())
  }
  // count to
  const {countToAction} = useCountTo()
  const [flopNum, setFlopNum] = useState(646456545515);
  const changeFlopNum = () => {
    // const val = flopNumAction.current?.getValue()||0;
    const newVal = Math.random()*100

    // flopNumAction.current?.setValue()
    // setFlopNum(newVal)
    const oldVal = countToAction.current?.getValue()||0;

    // countToAction.current?.setValue(oldVal+newVal)

   setFlopNum(oldVal+newVal)
  }
  return (
    <HomeWrap>
      {
        loading && <Loading>加载中...</Loading>
      }
      <HomeWrapImg src={require('@/assets/img/common/bg01.png')} />
      <ImgTop>
        <PageHeader>
          <HeaderImg src={require('@/assets/img/common/header.png')} />
          快乐大本营
        </PageHeader>
        <PageContent>
          <NumberBlock>
            <FlopNum value={numberValue} />
          </NumberBlock>
          <button onClick={handleChangeNum}>change number</button>
          <AreaBase areaName='t1'><T1Block /> </AreaBase>
          <AreaBase areaName='t2'>t2</AreaBase>
          <AreaBase areaName='t3'>
            <CountTo value={flopNum} ref={countToAction} />
            <button onClick={()=>changeFlopNum()}>changeFlopNum</button>
          </AreaBase>
          <AreaBase areaName='t4'><T4Block /></AreaBase>
          <AreaBase areaName='t5'>t5</AreaBase>
        </PageContent>
      </ImgTop>
    </HomeWrap>
  )
}
