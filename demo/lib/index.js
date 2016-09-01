import 'babel-polyfill'
import 'babel-register'
import Zoom from './Zoom'
import React from 'react'
import ReactDOM from 'react-dom'
const rootelem=document.getElementById('ReactZoomify')

ReactDOM.render(
   <Zoom/>,rootelem
)