import React from 'react'
import styles from './Input.css'

const input = props => {
  const inputClasses = [styles.Input]
  if (props.inValid && props.touched) inputClasses.push(styles.inValid)
  return (
    <input
      className={inputClasses.join(' ')}
      onChange={props.changed}
      style={{ width: props.inputWidth }}
      type={props.elementType}
      placeholder={props.placeHolder}
      value={props.value}
      id={props.id}
      inValid={props.inValid}
      min={props.min}
      max={props.max}
      ref={props.inputRef}
    />
  )
}

export default input
