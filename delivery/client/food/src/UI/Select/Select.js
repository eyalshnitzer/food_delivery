import React from 'react'

const select = props => {
  let limit = new Array(7)
  const show = (
    <select>
      {limit.map(item => (
        <option value={'fds'}> gfsg </option>
      ))}
    </select>
  )

  return <div>{show}</div>
}

export default select
