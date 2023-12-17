import {useEffect, useState} from 'react'

interface Props {
    option: string|number
    setNewValue: any
}

const DDOption = ({option, setNewValue}:Props) => {
  return (
    <div 
      onClick={() => setNewValue(option)}>
        <p>{option}</p>
    </div>
  )
}

export default DDOption