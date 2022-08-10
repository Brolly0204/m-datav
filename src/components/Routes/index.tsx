import React from "react";
import { BrowserRouter } from 'react-router-dom'
import Route from './Route'

export default function Routes() {
  return (
    <BrowserRouter basename="">
      <Route />
    </BrowserRouter>
  )
}
