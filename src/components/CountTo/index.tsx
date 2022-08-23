import { createRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import gsap from "gsap";
import styled from 'styled-components';

const CountToWrap = styled.div`
  text-align:center;
  font-size:20px;
  color:#fff;
`

export interface ICountToAction {
  setValue: (value:number) => void;
  getValue: () => number;
}

export interface ICountToProps {
  duration?:number;
  /**
   * value 是undefined的时候,是非受控模式
   */
  value?:number;
  defaultValue?:number;
  decimals?:number;
}

export const useCountTo = () => {
  const countToAction = createRef<ICountToAction>()
  return {
    countToAction
  }
}

export const CountTo = forwardRef<ICountToAction, ICountToProps>(({
  duration=1,
  value,
  decimals=0,
  defaultValue=0
}, ref) => {
  const initValue = value == undefined ? defaultValue : value
  const [renderNumber,setRenderNumber] = useState(initValue)
  const targetValueRef = useRef(initValue);
  const _setValue = (value: number)=>{
    // TODO
    if(targetValueRef.current === value){
      return ;
    }
    gsap.to(targetValueRef,{
      current: value,
      duration:duration,
      ease:'none',
      onUpdate:()=>{

        const valueFmtCecimal = Number(targetValueRef.current.toFixed(decimals))
        setRenderNumber(valueFmtCecimal)
      }
    })
 }
  const _getValue = ()=>{
    // TODO
    return targetValueRef.current;
 }
  useEffect(()=>{
    _setValue(value||0)
  },[value])

  useImperativeHandle(ref, () => ({
    setValue: _setValue,
    getValue: _getValue,
  }))
  return <CountToWrap>
    {renderNumber}
  </CountToWrap>
})
