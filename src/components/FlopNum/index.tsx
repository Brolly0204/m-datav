import { useMemo } from 'react'
import styled from 'styled-components'

interface FlopNumProps {
  value: string | number
}

const NumberItem = styled.div<{height: number}>`
  height: ${props => props.height}px;
  line-height: ${props => props.height}px;
  font-size: 14px;
  color: #fff;
  padding: 0 12px;
`

const FlopNumContainer = styled.div<{height: number}>`
  display: flex;
  width: 100%;
  height: ${props => props.height}px;
  color: #fff;
  overflow: hidden;
  justify-content: center;
`

const NumberItemWrap = styled.div<{ translateY: number }>`
  transform: translateY(${props => props.translateY}px);
  transition: transform 1s;
`

const allNum = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
const FlopNumItem = ({lineHeight, value } : {lineHeight:  number, value: string }) => {
  const translateY = useMemo(() => {
    const index = allNum.findIndex(v => v === value)
    if (index === -1) {
      return lineHeight
    } else {
      return -1 * index * lineHeight
    }
  }, [value, lineHeight])
  return <NumberItemWrap translateY={translateY}>
    {
      // allNum.map(num => <NumberItem height={lineHeight} key={num}>{num} v:{value} fi:{translateY}</NumberItem>)
      allNum.map(num => <NumberItem height={lineHeight} key={num}>{num}</NumberItem>)
    }
  </NumberItemWrap>
}

const lineHeight = 30
const FlopNum = ({ value }: FlopNumProps) => {
  const valueArr = useMemo(() => {
    if (!value) return ['0']
    return String(value).split('')
  }, [value])

  return (
    <FlopNumContainer height={lineHeight}>
    {
      valueArr.map((val, index) => (
        <FlopNumItem key={index} lineHeight={lineHeight} value={val}></FlopNumItem>
      ))
    }
    </FlopNumContainer>
  )
}

export default FlopNum
