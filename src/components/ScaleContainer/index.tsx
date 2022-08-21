import React from 'react'
import SingleObserver from './SingleObserver'

interface SizeInfo {

}

export type OnResize = (sizeInfo: SizeInfo) => void

export interface ScaleContainerProps {
  width: number
  height: number
  children: React.ReactElement
  disabled?: boolean
  maxScale?: number
  minScale?: number
  onResize?: OnResize
}

export default function (props: ScaleContainerProps) {
  return (
    <SingleObserver {...props}>
      { props.children }
    </SingleObserver>
  )
}
