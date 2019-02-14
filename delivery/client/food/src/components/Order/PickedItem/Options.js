import React from 'react'
import Option from './Option'

const options = props => {
  return (
    <div>
      {Object.keys(props.arr).map(function (key) {
        return <Option id={key} arr={props.arr[key]} />
      })}
    </div>
  )
}

export default options
