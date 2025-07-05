import React from 'react'
import { useRouteError } from 'react-router-dom'

function Errorcomp() {
    const err=useRouteError()
  return (
    <div>
        <h1>Oppsss!!!</h1>  
        <h3>{err.status}:{err.statusText}</h3>  
        <p>Something Went Wrong</p>    
    </div>
  )
}

export default Errorcomp