import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ScaleContainerProps } from '.';
import styled from 'styled-components';
import { useObserve } from './useObserve';


interface SingleObserverProps extends ScaleContainerProps {

}

const WrapDomStyle = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000;   
`

const ScaleDomStyle = styled.div<{ width: number, height: number, scale: number, left: number, top: number }>`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  transform: scale(${props => props.scale});
  transform-origin: top left;
`

export default function(props: SingleObserverProps) {
  const { children, disabled } = props
  const [scale, setScale] = useState(1)
  const [translateArr, setTranslateArr] = useState([0, 0])
  const wrapDomRef = useRef<HTMLDivElement>(null)
  const propsRef = useRef<SingleObserverProps>(props)
  propsRef.current = props

  const onInternalResize = useCallback((target: HTMLDivElement) => {
    const { width, height } = target.getBoundingClientRect()
    const fixedWidth = Math.floor(width)
    const fixedHeight = Math.floor(height)
    const w = fixedWidth / props.width;
    const h = fixedHeight / props.height;
    const s = Math.min(w, h)
    setScale(s)

    // 缩放后的translate值
    let leftNum = (fixedWidth - props.width * h) / 2
    let topNum = (fixedHeight - props.height * w) / 2
  
    setTranslateArr([Math.max(leftNum, 0), Math.max(topNum, 0)])
  }, [])

  useObserve({
    disabled,
    currenDom: wrapDomRef.current,
    onInternalResize
  })


  return (
    <WrapDomStyle ref={wrapDomRef}>
      <ScaleDomStyle width={props.width} height={props.height} scale={scale} left={translateArr[0] || 0} top={translateArr[1] || 0}>
        { children }
      </ScaleDomStyle>
    </WrapDomStyle>
  )
}